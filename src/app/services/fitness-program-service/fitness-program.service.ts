import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FitnessProgramService {
  private addFitnessProgramUrl =
    'http://localhost:8080/api/fitness-programs/add';

  constructor(private http: HttpClient) {}

  public addFitnessProgram(fitnessProgram: any) {
    return this.http.post(this.addFitnessProgramUrl, fitnessProgram);
  }
}
