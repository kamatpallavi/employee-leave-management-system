import { Routes } from '@angular/router';

import { Registration } from './registration/registration';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { ApplyLeave } from './apply-leave/apply-leave';

export const routes: Routes = [
  {
    path: 'registration',
    component: Registration
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'apply',
    component: ApplyLeave
  }
];