
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role.model';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = (route.data?.['roles'] ?? []) as Role[];

  if (!requiredRoles.length) {
    return auth.isLoggedIn$.pipe(map(ok => ok || router.createUrlTree(['/auth/login-page'])));
  }

  return auth.hasAnyRole$(requiredRoles).pipe(
    map(has => (has ? true : router.createUrlTree(['/auth/forbidden'])))
  );
};
