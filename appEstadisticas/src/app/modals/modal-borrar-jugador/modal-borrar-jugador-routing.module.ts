import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBorrarJugadorPage } from './modal-borrar-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBorrarJugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBorrarJugadorPageRoutingModule {}
