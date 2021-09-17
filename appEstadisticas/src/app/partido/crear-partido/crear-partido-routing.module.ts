import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPartidoPage } from './crear-partido.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPartidoPageRoutingModule {}
