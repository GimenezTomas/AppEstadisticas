import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSignInPageRoutingModule } from './modal-sign-in-routing.module';

import { ModalSignInPage } from './modal-sign-in.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSignInPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ModalSignInPage]
})
export class ModalSignInPageModule {}
