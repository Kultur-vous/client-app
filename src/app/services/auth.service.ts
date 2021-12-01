import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserSignIn } from '../types/auth';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  msAuthUrl = 'https://boo-user.herokuapp.com';

  logIn(user: UserSignIn): Observable<UserSignIn> {
    return this.http.post<UserSignIn>(`${this.msAuthUrl}/sign-in`, user).pipe(
      catchError((err) => {
        console.log('error caught in service', err);
        return throwError(err);
      })
    );
  }

  signUp(user: UserSignIn): Observable<UserSignIn> {
    console.log('service', user);
    return this.http.post<UserSignIn>(`${this.msAuthUrl}/sign-up`, user).pipe(
      catchError((err) => {
        console.log('error caught in service', err);
        return throwError(err);
      })
    );
  }
}
