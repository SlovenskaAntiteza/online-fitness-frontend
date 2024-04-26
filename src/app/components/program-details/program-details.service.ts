import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramDetailsService {
  constructor(private http: HttpClient) {}
  private programsUrl = 'http://localhost:8080/api/fitness-programs/';
  private commentsUrl = 'http://localhost:8080/api/fitness-programs/comment';

  public getProgramById(id: number): Observable<any> {
    let url = this.programsUrl + id;
    return this.http.get(url);
  }

  public submitComment(comment: any): Observable<any> {
    return this.http.post(this.commentsUrl, comment);
  }
}
