import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Example handling: redirect to login on 401
      if (error.status === 401) {
        router.navigate(['/login']);
      }

      // Optionally log or map error messages globally
      const message = error.error?.message || error.message || 'Unexpected error occurred';
      return throwError(() => ({ ...error, message }));
    })
  );
};


