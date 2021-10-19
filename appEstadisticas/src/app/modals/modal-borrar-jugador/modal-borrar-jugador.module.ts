import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBorrarJugadorPageRoutingModule } from './modal-borrar-jugador-routing.module';

import { ModalBorrarJugadorPage } from './modal-borrar-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBorrarJugadorPageRoutingModule
  ],
  declarations: [ModalBorrarJugadorPage]
})
export class ModalBorrarJugadorPageModule {}
