import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { off } from 'process';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FitnessProgramsService {
  private programsUrl = 'http://localhost:8080/api/fitness-programs/';
  private categoriesUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  public findAllPrograms(offset: number, pageSize: number): Observable<any> {
    let url = this.programsUrl + `${offset}/${pageSize}`;
    return this.http.get(url);
  }

  public findAllCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }

  public findAllCategoriesByFilters(
    offset: number,
    pageSize: number,
    filter: any
  ): Observable<any> {
    let url = this.programsUrl + `${offset}/${pageSize}`;
    console.log(url);
    return this.http.post(url, filter);
  }
}
