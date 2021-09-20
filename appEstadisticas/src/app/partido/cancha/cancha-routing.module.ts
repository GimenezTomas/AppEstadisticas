import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanchaPage } from '../cancha/cancha.page';

const routes: Routes = [
  {
    path: '',
    component: CanchaPage
  },
  {
    path: 'cancha-home',
    loadChildren: () => import('../patidos-home/patidos-home.module').then( m => m.PatidosHomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanchaPageRoutingModule {}
