import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
   {
    path: 'detalles',
    loadComponent: () => import('./detalles/detalles.page').then( m => m.DetallesPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'acerca-de',
    title: 'Acerca de',
    loadComponent: () => import('./acerca-de/acerca-de.page').then( m => m.AcercaDePage)
  },
  {
    path: 'detalles-obj',
    loadComponent: () => import('./detalles-obj/detalles-obj.page').then( m => m.DetallesObjPage)
  },
 
];
