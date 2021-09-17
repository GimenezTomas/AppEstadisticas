import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalJugadoresPage } from './modal-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: ModalJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalJugadoresPageRoutingModule {}
