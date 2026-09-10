import { Routes } from '@angular/router';

import { Registration } from './registration/registration';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { ApplyLeave } from './apply-leave/apply-leave';
import { MyLeaves } from './my-leaves/my-leaves';
import { PendingRequests } from './pending-requests/pending-requests';
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
  },
  {
    path: 'my-leaves',
    component: MyLeaves
  },
  {
    path: 'pending-requests',
    component: PendingRequests
  }
];