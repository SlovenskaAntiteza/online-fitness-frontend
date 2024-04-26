import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  private rssUrl = 'http://localhost:8080/api/feeds';

  constructor(private http: HttpClient) {}

  getRssItmes(): Observable<any> {
    return this.http.get(this.rssUrl);
  }
}
