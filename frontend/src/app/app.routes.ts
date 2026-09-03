import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: 'registration',
    component: Registration
  },
  {
    path: 'login',
    component: Login
  }
];