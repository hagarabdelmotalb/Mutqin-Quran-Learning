import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let modified = req;

  if (token) {
    modified = modified.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Ensure JSON content-type for JSON bodies if not already set
  if (modified.body && !(modified.headers.has('Content-Type'))) {
    modified = modified.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });
  }

  return next(modified);
};


