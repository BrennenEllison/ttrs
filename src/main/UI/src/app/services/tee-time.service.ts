import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeeTime } from '../common/tee-time';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeeTimeService {

  private baseURL = environment.UI + '/tee-time/search';
  private specialUrl = '/findByCourseIdAndBookingStatus?id=1&status=0';

  constructor(private httpClient: HttpClient) { }

  getTeeTimeList( courseId : number,
                  bookingStatus : number,
                  startTime : string,
                  endTime: string,
                  pageSize: number): Observable<TeeTime[]> {
    return this.httpClient.get<GetResponse>
    (`${this.baseURL}/findByDate?id=${courseId}&status=${bookingStatus}&startTime=${startTime}&endTime=${endTime}&size=${pageSize}`).pipe(
      map(response => response._embedded.teeTime)
    );
  }
}

interface GetResponse {
  _embedded: {
    teeTime: TeeTime[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
