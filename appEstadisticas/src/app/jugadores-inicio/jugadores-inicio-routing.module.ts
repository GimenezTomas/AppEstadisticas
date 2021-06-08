import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugadoresInicioPage } from './jugadores-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: JugadoresInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugadoresInicioPageRoutingModule {}
