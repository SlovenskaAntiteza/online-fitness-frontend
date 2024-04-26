import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  exercisesUrl = 'https://api.api-ninjas.com/v1/exercises?';
  apiKey = 'o3jsbq9tFkxMv0b8ZOxzBg==ZSsyk3HV0OA6U2C1';

  constructor(private http: HttpClient) {}

  public getAllExercises(muscle: any, level: any): Observable<any> {
    let url = this.exercisesUrl;
    if (muscle !== '') url = url + `muscle=${muscle}&`;
    if (level !== '') url = url + `difficulty=${level}&`;

    return this.http.get(url, {
      headers: { 'X-Api-Key': this.apiKey },
    });
  }
}
