import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiresponse } from '../models/apiresponse';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.apiUrl + '/api/reservations';
  getReservations(): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(this.baseUrl);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createReservation(reservation: Reservation): Observable<Apiresponse> {
    return this.http.post<Apiresponse>(this.baseUrl, reservation);
  }

  updateReservation(reservation: Reservation): Observable<Apiresponse> {
    return this.http.put<Apiresponse>(this.baseUrl, reservation);
  }

  deleteReservationById(id: number): Observable<Apiresponse> {
    return this.http.delete<Apiresponse>(`${this.baseUrl}/${id}`);
  }
  // deleteProducts(listId:[number]): Observable<Apiresponse> {
  //   return this.http.delete<Apiresponse>(this.baseUrl,listId);
  // }
  searchReservByName(name: string): Observable<Apiresponse> {
    return this.http.get<Apiresponse>(`${this.baseUrl}/name/${name}`);
  }
}
