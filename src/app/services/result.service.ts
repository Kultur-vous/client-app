import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Question } from '../types/home';
import { Score } from '../types/score';

@Injectable()
export class ResultService {
  constructor(private http: HttpClient) {}

  msScoreUrl = 'https://boo-score.herokuapp.com';

  addScore(score: Score) {
    const authToken = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');

    const options: any = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        email: email,
        id: userId,
      },
    };

    if (!authToken) {
      return throwError('no token in local storage');
    }

    return this.http
      .post<string[]>(`${this.msScoreUrl}/addScore`, score, options)
      .pipe(
        catchError((err) => {
          console.log('error caught in service', err);
          return throwError(err);
        })
      );
  }
}
