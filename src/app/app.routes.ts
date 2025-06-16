import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TradesComponent } from './components/trades/trades.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'trades', component: TradesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
