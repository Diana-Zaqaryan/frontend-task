import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SystemComponent} from './components/system/system.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[authGuard] },
  { path: 'system', component: SystemComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
