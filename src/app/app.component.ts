import { Component, OnChanges, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Character } from './types/character.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  publicKey = '42e4e75d5db25ebeb8f6f3433b1a6378';
  privateKey = '5ec2279b9a08f936eab47ea11af240f9dd079c20';
  timestamp = new Date().getTime().toString();
  apiUrl = 'https://gateway.marvel.com/v1/public/characters';
  limit = 100;
  offset = 0;
  allCharacters: any[] = []; // Initialize allCharacters array

  hash: string = CryptoJS.MD5(
    this.timestamp + this.privateKey + this.publicKey
  ).toString();
  url = `${this.apiUrl}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;

  filteredCharacters: any[] = [];
  showSuggestions: boolean = false;
  searchTerm: string = '';

  constructor(private readonly http: HttpClient) {}

  public ngOnInit(): void {
    this.fetchCharacters();
  }

  private fetchCharacters(): void {
    const fetchNextCharacters = (): void => {
      const urlWithPagination = `${this.url}&limit=${this.limit}&offset=${this.offset}`;

      this.http.get<any>(urlWithPagination).subscribe(
        response => {
          const characters = response.data.results;
          this.allCharacters.push(...characters);

          if (characters.length === this.limit) {
            this.offset += this.limit;
            fetchNextCharacters();
          } else {
            this.filteredCharacters = this.allCharacters;
          }
        },
        error => {
          console.error('An error occurred while fetching characters:', error);
          // Handle the error as needed
        }
      );
    };

    fetchNextCharacters();
  }

  public onSearchChange(): void {
    this.filteredCharacters = this.allCharacters.filter(
      (character: Character) => {
        return character.name
          .toLowerCase()
          .startsWith(this.searchTerm.toLowerCase());
      }
    );
    this.showSuggestions = true;
  }

  public selectCharacter(character: any): void {
    this.searchTerm = ''; // Clear the input field
    this.showSuggestions = false;
    alert(character.name); // Display an alert with the character's name
  }
}
