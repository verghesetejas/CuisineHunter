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
   * Get User ID from username and password.
   */
  getUserId(userName: string, userPass: string): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:1337/api/users/${userName}/${userPass}`);
  }

  /**
   * Get User Details from the backend server.
   */
  getUserDetails(userId: number): Observable<Array<Auth>> {
    return this.httpClient.get<Array<Auth>>(`http://localhost:1337/api/users/${userId}`);
  }
}
