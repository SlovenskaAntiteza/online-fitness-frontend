import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class MyProgramsService {
  private getCreatedProgramsUrl =
    config.ROOT_PATH + 'fitness-programs/get-created/';
  private getActiveProgramsUrl =
    config.ROOT_PATH + 'fitness-programs/get-active/';
  private getFinishedProgramsUrl =
    config.ROOT_PATH + 'fitness-programs/get-finished/';
  private deleteFitnessProgramUrl =
    config.ROOT_PATH + 'fitness-programs/delete-fitness-program/';

  constructor(private http: HttpClient) {}

  public getCreatedPrograms(userId: any) {
    let url = this.getCreatedProgramsUrl + `${userId}`;
    return this.http.get(url);
  }

  public getActivePrograms(userId: any) {
    let url = this.getActiveProgramsUrl + `${userId}`;
    return this.http.get(url);
  }

  public getFinishedPrograms(userId: any) {
    let url = this.getFinishedProgramsUrl + `${userId}`;
    return this.http.get(url);
  }

  public deleteFitnessProgram(userId: any, programId: any) {
    let url = this.deleteFitnessProgramUrl + `${userId}` + '/' + `${programId}`;
    return this.http.delete(url);
  }
}
