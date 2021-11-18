import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJugadorModalPage } from './crear-jugador-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJugadorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJugadorModalPageRoutingModule {}
