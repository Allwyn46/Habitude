import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  return http.get('/api/auth/authstatus', { withCredentials: true }).pipe(
    map((response: any) => {
      if (response?.isloggedin == true) {
        return true;
      } else {
        router.navigateByUrl('login');
        return false;
      }
    }),
    catchError(() => {
      router.navigateByUrl('login');
      return of(false);
    }),
  );
};
