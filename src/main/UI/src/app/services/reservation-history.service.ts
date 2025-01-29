import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReservationHistory } from '../common/reservation-history';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Reservation } from '../common/reservation';
import { catchError } from 'rxjs';
import { PlayerReservation } from '../common/player-reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationHistoryService {

  private url = environment.UI + "/reservations/history"


  constructor(private httpClient: HttpClient) { }


  getReservationHistoryList(email: string): Observable<ReservationHistory[]>{
    return this.httpClient.get<ReservationHistory[]>(`${this.url}?email=${email}`);
  }

  getReservation(id: number): Observable<PlayerReservation>{
    return this.httpClient.get<PlayerReservation>(`${environment.UI}/reservations/edit?id=${id}`);
  }

  deleteReservation(id: number): Observable<Reservation>{
    return this.httpClient.delete<Reservation>(`${environment.UI}/reservations/edit?id=${id}`).pipe(catchError(this.handleError));
  }

  updateReservation(id: number, updatedReservation: Partial<Reservation>): Observable<Reservation>{
    return this.httpClient.put<Reservation>(`${environment.UI}/reservations/edit?id=${id}`, updatedReservation).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(()=> new Error(errorMessage))
  }

}

interface GetResponse {
  _embedded: {
    reservation: PlayerReservation;
  }
}
