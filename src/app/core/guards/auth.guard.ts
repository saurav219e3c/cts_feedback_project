
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    map(loggedIn =>
      loggedIn
        ? true
        : router.createUrlTree(
            ['/auth/login-page'],
            { queryParams: { redirect: state.url } }
          )
    )
  );
};
