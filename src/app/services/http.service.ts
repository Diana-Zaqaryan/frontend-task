import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getCountries(): Observable<any> {
    return this.http.get(`${this.url}/GetCountryCode`);
  }

  public checkPhone(body: { username: string }): Observable<any> {
    return this.http.post(`${this.url}/checkPhone`, body);
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { username, password });
  }

  public getSystemData(token: string) {
    return [
      this.http.get(`${this.url}/getUserData`, { headers: { Authorization: token } }),
      this.http.get(`${this.url}/getBankAccounts`, { headers: { Authorization: token } }),
      this.http.get(`${this.url}/getAdditionalData`, { headers: { Authorization: token } }),
      this.http.get(`${this.url}/getTransactions`, { headers: { Authorization: token } }),
    ];
  }
}

