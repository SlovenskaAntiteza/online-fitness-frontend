import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { config } from '../config/config';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public loggedInUserSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  loggedInUserId = this.loggedInUserSubject.asObservable();

  public setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  get isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  public getUser(): any {
    if (typeof sessionStorage !== 'undefined' && sessionStorage) {
      let user = sessionStorage.getItem(config.SESSION_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }

    return null;
  }

  private registerUserUrl = 'http://localhost:8080/api/auth/register';

  private loginUser = 'http://localhost:8080/api/auth/login';
  private activateUser =
    'http://localhost:8080/api/auth/confirm-account?token=';

  constructor(
    private http: HttpClient,
    private router: Router,
    private ms: MessageService
  ) {}

  public registerUser(user: any) {
    return this.http.post(this.registerUserUrl, user);
  }

  public activateAccount(token: string) {
    let url = this.activateUser + `${token}`;
    return this.http.get(url);
  }

  public login(login: any) {
    return this.http.post<any>(this.loginUser, login);
  }

  public logout() {
    this.loggedIn.next(false);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
