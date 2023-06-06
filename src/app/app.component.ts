import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { characterUrl } from 'src/environments/environment';
import { Character } from './types/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode: boolean = false;
  limit = 100;
  offset = 0;
  allCharacters: Character[] = [];

  form: FormGroup;
  searchControl: FormControl = new FormControl();
  filteredCharacters: Character[] = [];
  showSuggestions: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.watchFormChanges();
    this.fetchCharacters();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      input: this.searchControl,
    });
  }

  private watchFormChanges(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value: string) => {
        this.searchCharacters(value);
      });
  }

  private fetchCharacters(): void {
    this.allCharacters = [];
    this.offset = 0;

    const fetchNextCharacters = () => {
      const urlWithPagination = `${characterUrl}&limit=${this.limit}&offset=${this.offset}`;

      this.http.get<any>(urlWithPagination).subscribe(
        (response: any) => {
          const characters = response.data.results;
          this.allCharacters.push(...characters);

          if (characters.length === this.limit) {
            this.offset += this.limit;
            fetchNextCharacters();
          } else {
            this.searchCharacters('');
          }
        },
        (error: any) => {
          console.error('An error occurred while fetching characters:', error);
        }
      );
    };

    fetchNextCharacters();
  }

  private searchCharacters(searchTerm: string): void {
    if (searchTerm !== null && searchTerm.trim() !== '') {
      this.filteredCharacters = this.allCharacters.filter(
        (character: Character) =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = [];
    }

    this.showSuggestions = true;
  }

  public selectCharacter(character: any): void {
    this.form.reset();
    this.showSuggestions = false;
    alert(character.name);
  }

  toggleColorScheme(): void {
    this.darkMode = !this.darkMode;
  }
}
