
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './admin/admin.routes';

export const routes: Routes = [

    {
        path:'admin',children:ADMIN_ROUTES
    },
    {
        path:'',redirectTo:'admin',pathMatch:'full'
    }
  ]
export const APP_ROUTES: Routes = [
  // Redirect base path -> /auth
  { path: '', pathMatch: 'full', redirectTo: 'auth' },

  // Lazy load the auth feature routes
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

];
