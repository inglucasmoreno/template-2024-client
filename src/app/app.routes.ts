import { Routes } from '@angular/router';
import { InicializacionComponent } from './inicializacion/inicializacion.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/home' },
  { path: 'init', component: InicializacionComponent },
  { path: '**', component: ErrorPageComponent },
];
