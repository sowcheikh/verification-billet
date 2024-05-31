import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap, map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TOKEN_KEY, USER_KEY} from "../utils/constant";
import {environment} from "../../../environments/environment";

export interface Response {
  account: any;
  accessToken: string;
  expires_in: number;
  token_type: string;
  permissions: string[];

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
  }
  // Cette méthode vérifiera si l'utilisateur est authentifié ou non.
  loadToken() {
    const token =  localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.isAuthenticated.next(true);
      this.token = token;
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // Il s'agit d'une fausse méthode de connexion. Il renverra un jeton si les informations d'identification sont correctes.
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiURL}/admin/login`, credentials).pipe(
      tap(async (_data: any) => {
        this.isAuthenticated.next(true);
        localStorage.setItem(TOKEN_KEY, _data.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(_data.account));
      })
    );
  }

  // Il s'agit d'une fausse méthode de déconnexion. Cela supprimera le jeton du stockage.
  async logout(): Promise<void> {
    await localStorage.removeItem(TOKEN_KEY);
    await localStorage.removeItem(USER_KEY);
    this.isAuthenticated.next(false);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY) ?? null;
  }
}
