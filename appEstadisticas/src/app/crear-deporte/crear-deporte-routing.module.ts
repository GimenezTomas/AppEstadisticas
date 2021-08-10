
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearDeportePage } from './crear-deporte.page';

const routes: Routes = [
  {
    path: '',
    component: CrearDeportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearDeportePageRoutingModule {}