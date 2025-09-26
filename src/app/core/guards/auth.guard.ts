import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import e from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if(localStorage.getItem('userToken')){
    return true;
  }
  else{
    _Router.navigate(['/login']);
    return false;
  }
};
