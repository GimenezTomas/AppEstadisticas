import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditarPageRoutingModule } from './modal-editar-routing.module';

import { ModalEditarPage } from './modal-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditarPageRoutingModule
  ],
  declarations: [ModalEditarPage]
})
export class ModalEditarPageModule {}
