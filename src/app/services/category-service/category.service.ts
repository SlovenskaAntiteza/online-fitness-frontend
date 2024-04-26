import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesForClienUrl = config.ROOT_PATH + 'category-subscriptions';
  private subscibeUrl = config.ROOT_PATH + 'category-subscriptions/subscribe/';
  private unsubscibeUrl =
    config.ROOT_PATH + 'category-subscriptions/unsubscribe/';

  private categoriesUrl = config.ROOT_PATH + 'categories';

  constructor(private http: HttpClient) {}

  public getCategoriesForClient(userId: any): Observable<any> {
    let url = this.categoriesForClienUrl + `/${userId}`;
    return this.http.get(url);
  }

  public getCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }

  public subscribe(userId: any, categoryId: any) {
    let url = this.subscibeUrl + `${userId}/${categoryId}`;
    return this.http.get(url);
  }

  public unsubscribe(userId: any, categoryId: any) {
    let url = this.unsubscibeUrl + `${userId}/${categoryId}`;
    return this.http.get(url);
  }
}
