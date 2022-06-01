import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const authUrl = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiUrl + '/api/login';
  ok: boolean;
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    this.ok = true;
    return this.http.post(
      this.baseUrl,
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }
}
