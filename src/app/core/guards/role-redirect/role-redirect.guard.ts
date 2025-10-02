import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();
  
  // If no user is logged in, redirect to login
  if (!user) {
    return router.parseUrl('/login');
  }

  // Redirect based on role
  if (user.role === 'TUTOR') {
    return router.parseUrl('/tutor-dashboard');
  } else if (user.role === 'STUDENT') {
    return router.parseUrl('/home');
  } else {
    // Default fallback for unknown roles
    return router.parseUrl('/home');
  }
};

