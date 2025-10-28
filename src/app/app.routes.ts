import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Layout } from './components/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard-guard';
import { loginGuard } from './guards/login-guard-guard';
import { Profile } from './components/profile/profile';
import { Setup2fa } from './components/setup2fa/setup2fa';
import { Verify2fa } from './components/verify2fa/verify2fa';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'setup-2fa',
    component: Setup2fa,
  },
  {
    path: 'verify-2fa',
    component: Verify2fa,
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'profile',
        component: Profile,
      },
    ],
  },
];
