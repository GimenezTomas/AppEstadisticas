import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadoresAgregarPageRoutingModule } from './jugadores-agregar-routing.module';

import { JugadoresAgregarPage } from './jugadores-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresAgregarPageRoutingModule
  ],
  declarations: [JugadoresAgregarPage]
})
export class JugadoresAgregarPageModule {}
