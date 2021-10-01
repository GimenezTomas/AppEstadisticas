import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalElegirPartidoPage } from './modal-elegir-partido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalElegirPartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalElegirPartidoPageRoutingModule {}
