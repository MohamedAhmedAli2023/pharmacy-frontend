import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];

  return authService.getUser().pipe(
    map(user => {
      if (user?.role_id === expectedRole) {
        return true;
      } else {
        router.navigate(['/register']); // Redirect if role doesn’t match
        return false;
      }
    })
  );
};
