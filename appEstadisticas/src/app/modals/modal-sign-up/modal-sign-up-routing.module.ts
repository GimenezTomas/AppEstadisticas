import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSignUpPage } from './modal-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSignUpPageRoutingModule {}
