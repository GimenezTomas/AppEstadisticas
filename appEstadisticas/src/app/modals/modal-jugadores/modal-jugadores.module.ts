import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalJugadoresPageRoutingModule } from './modal-jugadores-routing.module';

import { ModalJugadoresPage } from './modal-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalJugadoresPageRoutingModule
  ],
  declarations: [ModalJugadoresPage]
})
export class ModalJugadoresPageModule {}
