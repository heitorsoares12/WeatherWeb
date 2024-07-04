import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.routes').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.routes').then(m => m.WEATHER_ROUTES)
  }
];