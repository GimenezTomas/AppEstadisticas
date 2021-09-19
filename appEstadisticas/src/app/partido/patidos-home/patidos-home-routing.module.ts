import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatidosHomePage } from './patidos-home.page';

const routes: Routes = [
  {
    path: '',
    component: PatidosHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatidosHomePageRoutingModule {}
