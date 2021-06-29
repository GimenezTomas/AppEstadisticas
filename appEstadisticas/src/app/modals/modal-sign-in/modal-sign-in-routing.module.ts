import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSignInPage } from './modal-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSignInPageRoutingModule {}
