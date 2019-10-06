import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Auth;

  constructor(private httpClient: HttpClient) { }

  /**
   * Sets the current app user logged-in
   * @param user - user object
   */
  setCurrentUser(user: Auth): void {
    this.currentUser = user;
  }

  /**
   * Fetches the current logged-in user
   */
  getCurrentUser(): Auth {
    return this.currentUser;
  }

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

  /**
   * Returns the total number of users in the database users
   */
  getUserCount(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>('http://localhost:1337/api/countusers');
  }

  /**
   * New User Sign-up method
   * @param user - user object
   */
  postUser(user: any): Observable<Auth> {
    return this.httpClient.post<Auth>(`http://localhost:1337/api/postuser`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Updates an existing record in the database
   */
  // updateUser(user: any): void {}
}
