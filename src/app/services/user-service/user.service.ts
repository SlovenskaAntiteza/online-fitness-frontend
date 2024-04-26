import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private getAllUsersUrl = config.ROOT_PATH + 'users';
  private updateUserUrl = 'http://localhost:8080/api/users/update/';
  private changePasswordUrl = 'http://localhost:8080/api/auth/change-password';
  private isUserParticipatingUrl = config.ROOT_PATH + 'users/is-participating/';
  private sendMessageToAdvisorUrl =
    config.ROOT_PATH + 'advisor-question/send-message';
  private participateInFitnessProgramUrl =
    config.ROOT_PATH + 'users/participate/';

  public getUser(): any {
    if (typeof sessionStorage !== 'undefined' && sessionStorage) {
      let user = sessionStorage.getItem(config.SESSION_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }

    return null;
  }

  public getAllUsers() {
    return this.http.get(this.getAllUsersUrl);
  }

  public updateUser(request: any, id: any) {
    return this.http.post(this.updateUserUrl + `${id}`, request);
  }

  public setSessionUser(user: any) {
    sessionStorage.setItem(config.SESSION_KEY, JSON.stringify(user));
  }

  public changePassword(request: any) {
    return this.http.post(this.changePasswordUrl, request);
  }

  public participateUserInFitnessProgram(userId: any, programId: any) {
    let url =
      this.participateInFitnessProgramUrl + `${userId}` + '/' + `${programId}`;
    return this.http.get(url);
  }

  public isParticipating(userId: any, programId: any) {
    let url = this.isUserParticipatingUrl + `${userId}` + '/' + `${programId}`;
    return this.http.get(url);
  }

  public sendMessageToAdvisor(message: any): Observable<any> {
    return this.http.post(this.sendMessageToAdvisorUrl, message);
  }
}
