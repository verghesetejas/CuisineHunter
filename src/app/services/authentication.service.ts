import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get User Details from the backend server.
   */
  getUserDetails(): Observable<Array<Auth>> {
    return this.httpClient.get<Array<Auth>>(`http://localhost:1337/api/users/2`);
  }
}
