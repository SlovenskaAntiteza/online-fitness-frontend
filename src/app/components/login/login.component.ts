import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';
import { config } from '../../config/config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ms: MessageService
  ) {}

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    let loginData = { ...this.loginForm.value };

    this.authService.login(loginData).subscribe(
      (response) => {
        if (response.status === true) {
          const token = response.token;
          this.authService.setLoggedIn(true);
          sessionStorage.setItem(config.TOKEN, token);
          sessionStorage.setItem(config.SESSION_KEY, JSON.stringify(response));
          this.router.navigate(['/fitness-news']);
        } else {
          this.ms.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Your account is not activated!',
          });
        }
      },
      (error) => {
        this.authService.setLoggedIn(false);
        this.router.navigate(['/login']);
        this.ms.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!',
        });
        this.loginForm.reset();
      }
    );
  }
}
