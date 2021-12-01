import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface UserSignIn {
  email: string;
  password: string;
  token: string;
}

export interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  msAuthUrl = 'http://localhost:3000';

  getConfig() {
    return this.http.get(`${this.msAuthUrl}/users`);
  }

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
