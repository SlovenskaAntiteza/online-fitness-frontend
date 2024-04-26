import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs';
import { Activity } from '../../domain/activity';

@Injectable({
  providedIn: 'root',
})
export class AnalyticService {
  private findAllActivitiesForUserIdUrl = config.ROOT_PATH + 'analytic/';
  private deleteActivityUrl = config.ROOT_PATH + 'analytic/';
  private addActivityUrl = config.ROOT_PATH + 'analytic';

  private addBodyWeightUrl = config.ROOT_PATH + 'body-weights';
  private findAllBodyWeightsForUserUrl =
    config.ROOT_PATH + 'body-weights/chart';
  private downloadPdfUrl = config.ROOT_PATH + 'analytic/pdf/';

  constructor(private http: HttpClient) {}

  public findAllActivitesForUserId(userId: any): Observable<Activity[]> {
    let url = this.findAllActivitiesForUserIdUrl + `${userId}`;
    return this.http.get<Activity[]>(url);
  }

  public deleteActivity(activityId: any) {
    let url = this.deleteActivityUrl + `${activityId}`;
    return this.http.delete(url);
  }

  public addActivity(activity: any) {
    return this.http.post(this.addActivityUrl, activity);
  }

  public addBodyWeight(request: any) {
    return this.http.post(this.addBodyWeightUrl, request);
  }

  public findAllBodyWeightsForUser(request: any) {
    return this.http.post(this.findAllBodyWeightsForUserUrl, request);
  }

  public downloadPdf(userId: any): Observable<Blob> {
    let url = this.downloadPdfUrl + `${userId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
