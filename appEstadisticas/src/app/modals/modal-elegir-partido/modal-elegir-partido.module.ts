import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalElegirPartidoPageRoutingModule } from './modal-elegir-partido-routing.module';

import { ModalElegirPartidoPage } from './modal-elegir-partido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalElegirPartidoPageRoutingModule
  ],
  declarations: [ModalElegirPartidoPage]
})
export class ModalElegirPartidoPageModule {}
