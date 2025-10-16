import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Layout } from './components/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard-guard';
import { loginGuard } from './guards/login-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    /* canActivate: [loginGuard], */
  },
  {
    path: 'register',
    component: Register,
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
    ],
  },
];
