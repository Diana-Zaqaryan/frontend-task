import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class HttpService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }


  public getCountries(): Observable<any> {
    return this.http.get(`${this.url}/GetCountryCode`);
  }

  public checkPhone(body: { username: string }): Observable<any> {
    return this.http.post(`${this.url}/checkPhone`, body);
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, {username, password});
  }


  public getUserData(token: string) {
    return this.http.get(`${this.url}/getUserData`, {headers: {Authorization: token}}).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  public getBankAccount(token: string) {
    return this.http.get(`${this.url}/getBankAccounts`, {headers: {Authorization: token}}).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  public getAdditionalData(token: string) {
    return this.http.get(`${this.url}/getAdditionalData`, {headers: {Authorization: token}}).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  public getTransactions(token: string) {
    return this.http.get(`${this.url}/getTransactions`, {headers: {Authorization: token}}).pipe(
      catchError(this.handleError.bind(this))
    )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.authService.logout();
      this.router.navigate(['login']);
    }
    return of([]);
  }
}

