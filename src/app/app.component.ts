import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { CharacterData } from './types/characters';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private publicKey = '42e4e75d5db25ebeb8f6f3433b1a6378';
  private privateKey = '5ec2279b9a08f936eab47ea11af240f9dd079c20';
  private timestamp = new Date().getTime().toString();
  private apiUrl = 'https://gateway.marvel.com/v1/public/characters';

  private hash: string = CryptoJS.MD5(
    this.timestamp + this.privateKey + this.publicKey
  ).toString();
  private url = `${this.apiUrl}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;

  constructor(private readonly http: HttpClient) {}

  public ngOnInit(): void {
    this.http
      .get(this.url)
      .pipe(
        tap((characters: any) => {
          console.log(characters.data.results);
        })
      )
      .subscribe();
  }
}
