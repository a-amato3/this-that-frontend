import * as CryptoJS from 'crypto-js';

export const environment = {
  production: false,
  publicKey: '42e4e75d5db25ebeb8f6f3433b1a6378',
  privateKey: '5ec2279b9a08f936eab47ea11af240f9dd079c20',
  apiUrl: 'https://gateway.marvel.com/v1/public/characters',
  timestamp: new Date().getTime().toString(),
};

const hash = CryptoJS.MD5(
  environment.timestamp + environment.privateKey + environment.publicKey
).toString();

export const characterUrl = `${environment.apiUrl}?ts=${environment.timestamp}&apikey=${environment.publicKey}&hash=${hash}`;
