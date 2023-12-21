import { Routes } from '@angular/router';
import { InicializacionComponent } from './inicializacion/inicializacion.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'init', component: InicializacionComponent },
  { path: '**', component: ErrorPageComponent },
];
