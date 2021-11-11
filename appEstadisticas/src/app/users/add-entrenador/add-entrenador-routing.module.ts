import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEntrenadorPage } from './add-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: AddEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEntrenadorPageRoutingModule {}
