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
    const headers = new HttpHeaders().set('content-type', 'application/json').set('user-key', Constants.USER_KEY);
    return this.httpClient.get(`${Constants.ZOMATO_SEARCH_URL}` + params, { headers: headers });
  }
}
