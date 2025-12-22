
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  // Redirect base path -> /auth
  { path: '', pathMatch: 'full', redirectTo: 'auth' },

  // Lazy load the auth feature routes
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // Optional: 404 route
  { path: '**', redirectTo: 'auth' },
];
