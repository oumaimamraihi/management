import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private authService: AuthService) {}
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user: User | null;
  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  login(credentials) {
    return this.authService.login(credentials).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        sessionStorage.setItem(TOKEN_KEY, response.token);
        this.user = this.getUser(response.token);
      })
    );
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(token): User | null {
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
