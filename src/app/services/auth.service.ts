import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

  private tokenKey = 'authToken';
  private loggedIn = false;

  constructor() {
    this.loggedIn = localStorage.getItem('authToken') ? true : false;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public login(token: string): void {
    this.loggedIn = true;
    localStorage.setItem('authToken', token);
  }

  public logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('authToken');
  }

  public setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn = true
  }

  public getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  public isAuthenticated() {
    return !!this.getToken();
  }

}
