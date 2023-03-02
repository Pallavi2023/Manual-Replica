import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BinaryLike } from 'crypto';
import * as shajs from 'sha.js';
import { environment } from 'src/environments/environment';
// import * as crypto from 'crypto-js';
// import sha256 from 'crypto-js/sha256';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: any;

  constructor(private _http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }
  loginUser(user: any) {


    return this._http.post<any>(this.baseUrl + "/api/auth/login", user);
  }


  getHash(text: any) {
    return shajs('sha256').update(text).digest('hex')
  }
}

// interface AuthResponse {
//   token : string,
//   responseCode : number
// }