import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [],
    children: [
      { path: 'home', component: HomeComponent },
    ]
  }
];

export const PagesRoutes = RouterModule.forChild(routes);
