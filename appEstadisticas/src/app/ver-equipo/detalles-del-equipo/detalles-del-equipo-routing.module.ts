import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesDelEquipoPage } from './detalles-del-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesDelEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesDelEquipoPageRoutingModule {}
