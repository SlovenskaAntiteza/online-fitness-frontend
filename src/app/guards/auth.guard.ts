import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { config } from '../config/config';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.isLoggedIn) {
    return true;
  } else {
    let router = inject(Router);
    return router.navigate(['']);
  }
};
