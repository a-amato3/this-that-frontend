import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { characterUrl } from 'src/environments/environment';
import { Character } from './types/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public darkMode: boolean = false;
  public limit = 100;
  public offset = 0;
  public allCharacters: Character[] = [];

  public form: FormGroup;
  public filteredCharacters: Character[] = [];
  public showSuggestions: boolean = false;
  public readonly INPUT = 'input';

  constructor(
    private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.buildForm();
    this.watchFormChanges();
    this.fetchCharacters();
  }

  /**
   * Builds the form with a single form control for the input field.
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      [this.INPUT]: this.formBuilder.control(null),
    });
  }

  /**
   * Subscribes to changes in the input field value and triggers a search after time is debounced.
   */
  private watchFormChanges(): void {
    this.form.controls[this.INPUT].valueChanges
      .pipe(debounceTime(200))
      .subscribe((value: string) => {
        this.searchCharacters(value);
      });
  }

  /**
   * Fetches characters from the API by making consecutive requests with pagination to get a full list.
   */
  public fetchCharacters(): void {
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

  /**
   * Filters characters based on the search term and updates the filteredCharacters array.
   * If the search term is empty, the filteredCharacters array is cleared.
   * Sets showSuggestions to true to display the suggestions.
   * @param searchTerm The search term entered by the user.
   */
  public searchCharacters(searchTerm: string): void {
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

  /**
   * Resets the form, hides the suggestions, and displays an alert with the selected character's name.
   * @param character The selected character.
   */
  public selectCharacter(character: any): void {
    this.form.reset();
    this.showSuggestions = false;
    alert(character.name);
  }

  /**
   * Resets the form, hides the suggestions, and displays an alert with the selected character's name.
   * @param character The selected character.
   */
  public toggleColorScheme(): void {
    this.darkMode = !this.darkMode;
  }
}
