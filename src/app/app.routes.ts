import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { TradesComponent } from './trades.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'trades', component: TradesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
