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
   * Returns the Logged User ID
   */
  getLoggedUserId(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>('http://localhost:1337/api/loggedusers');
  }

  /**
   * Returns array for user history
   * @param id - User ID
   */
  getUserHistory(id: number): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(`http://localhost:1337/api/userhistory/${id}`);
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
   * Current Logged-in User
   * @param userLog - user log object
   */
  postLoggedUser(userLog: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:1337/api/postloggeduser`, userLog, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Post User history into database
   * @param userLog - user history object
   */
  postUserHistory(data: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:1337/api/posthistory`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Update an existing user's details
   * @param user - user object
   */
  updateUser(user: any): Observable<Auth> {
    return this.httpClient.put<Auth>(`http://localhost:1337/api/putuser/${user.userId}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Logout the current user
   */
  logoutUser(): Observable<any> {
    return this.httpClient.delete(`http://localhost:1337/api/deleteloggedusers`);
  }
}
