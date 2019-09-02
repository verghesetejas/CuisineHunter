import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../shared/constants';
import { Observable } from 'rxjs';
import { ZomatoSearch } from '../models/zomato-search.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor( private httpClient: HttpClient ) { }

  public getQuery(params: any): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('user-key', '49a4eb933ed5dcadf897cc4be97788bf');
    return this.httpClient.get(`https://developers.zomato.com/api/v2.1/search?q=` + params, { headers: headers });
  }
}
