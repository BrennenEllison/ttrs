import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addon } from '../common/addon';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AddonService {

  private baseURL = environment.UI + '/addons';

  constructor(private httpClient: HttpClient) { }

  getAddonList(){
    return this.httpClient.get<GetResponse>(this.baseURL).pipe(
      map(response => response._embedded.addons)
    );
  }
}

interface GetResponse{
  _embedded: {
    addons: Addon[];
  }
}
