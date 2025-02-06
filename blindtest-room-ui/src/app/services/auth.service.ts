import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {TokenInfo} from "../models/tokenInfo";
import {Credential} from "../models/credential";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly URL = environment.api;

  signIn(inputs: Credential): Observable<TokenInfo>{
    return this.http.post<TokenInfo>(this.URL + "auth", inputs);
  }
}
