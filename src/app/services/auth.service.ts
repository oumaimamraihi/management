import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from '../global-constants';
import { User } from '../models/user';
const authUrl = GlobalConstants.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  ok: boolean;
  constructor(private http: HttpClient) {}

  login(email:string, password:string): Observable<any> {
    this.ok = true;
    return this.http.post(
      authUrl + 'login',
      {
        email: email,
        password: password,
      },
      httpOptions
    );
  }

}
