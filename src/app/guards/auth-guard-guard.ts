import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = 0;

  if (isLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
