import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPartidoPageRoutingModule } from './crear-partido-routing.module';

import { CrearPartidoPage } from './crear-partido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPartidoPageRoutingModule
  ],
  declarations: [CrearPartidoPage]
})
export class CrearPartidoPageModule {}
