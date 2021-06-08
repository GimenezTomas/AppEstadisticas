import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresAgregarPage } from './jugadores-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresAgregarPageRoutingModule {}
