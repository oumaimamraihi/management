import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiresponse } from '../models/apiresponse';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.apiUrl + '/api/roles';

  getRoles(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(this.baseUrl);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRoleByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }

  createRole(role: Role): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(this.baseUrl, role);
  }

  updateRole(role: Role): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(this.baseUrl, role);
  }

  deleteRoleById(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${this.baseUrl}/${id}`);
  }

  addRoleToUser(emailAndRole: any) {
    return this.http.post<Apiresponse>(this.baseUrl+'/roletouser', emailAndRole);
  }
}
