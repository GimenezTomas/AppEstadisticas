import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugadoresInicioPageRoutingModule } from './jugadores-inicio-routing.module';

import { JugadoresInicioPage } from './jugadores-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugadoresInicioPageRoutingModule
  ],
  declarations: [JugadoresInicioPage]
})
export class JugadoresInicioPageModule {}
