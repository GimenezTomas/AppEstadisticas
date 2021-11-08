import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EleccionUsuarioPage } from './eleccion-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: EleccionUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EleccionUsuarioPageRoutingModule {}
