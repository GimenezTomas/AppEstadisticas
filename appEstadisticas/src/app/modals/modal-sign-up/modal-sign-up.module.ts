import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalSignUpPageRoutingModule } from './modal-sign-up-routing.module';
import { ModalSignUpPage } from './modal-sign-up.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSignUpPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ModalSignUpPage]
})
export class ModalSignUpPageModule {}
