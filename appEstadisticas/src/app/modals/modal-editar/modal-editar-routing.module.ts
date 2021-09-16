import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditarPage } from './modal-editar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditarPageRoutingModule {}
