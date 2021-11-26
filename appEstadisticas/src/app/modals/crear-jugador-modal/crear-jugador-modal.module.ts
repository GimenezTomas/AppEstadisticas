import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearJugadorModalPageRoutingModule } from './crear-jugador-modal-routing.module';

import { CrearJugadorModalPage } from './crear-jugador-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearJugadorModalPageRoutingModule
  ],
  declarations: [CrearJugadorModalPage]
})
export class CrearJugadorModalPageModule {}
