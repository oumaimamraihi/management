import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiresponse } from '../models/apiresponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.apiUrl + '/api/users';

  getUsers(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(this.baseUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }

  createUser(user: User): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(this.baseUrl, user);
  }

  deleteUserById(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${this.baseUrl}/${id}`);
  }
  deleteUsers(listId: any): Observable<Apiresponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: listId,
    };
    return this.http.delete<Apiresponse>(this.baseUrl, options);
  }
  ExportToPDF(listId: any) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   body: listId,
    // };

    return this.http.post(`${this.baseUrl}/export/pdf/`,listId);
  }

  searchUserByName(name: string): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/searchname/${name}`);
  }

  searchUserByEmail(email: string): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/searchemail/${email}`);
  }
}
