import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Question } from '../types/home';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  msQuestionsUrl = 'https://boo-question.herokuapp.com';

  getCategories() {
    return this.http.get<string[]>(`${this.msQuestionsUrl}/categories`).pipe(
      catchError((err) => {
        console.log('error caught in service', err);
        return throwError(err);
      })
    );
  }

  getLevels() {
    return this.http.get<string[]>(`${this.msQuestionsUrl}/levels`).pipe(
      catchError((err) => {
        console.log('error caught in service', err);
        return throwError(err);
      })
    );
  }

  getQuestions(level: string, nbQuestions: string, category: string) {
    const authToken = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const options: any = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        email: email,
      },
    };

    if (!authToken) {
      return throwError('no token in local storage');
    }

    return this.http
      .get<Question[]>(
        `${this.msQuestionsUrl}/questions?level=${level}&nbQuestion=${nbQuestions}&category=${category}`,
        options
      )
      .pipe(
        catchError((err) => {
          console.log('error caught in service', err);
          return throwError(err);
        })
      );
  }
}
