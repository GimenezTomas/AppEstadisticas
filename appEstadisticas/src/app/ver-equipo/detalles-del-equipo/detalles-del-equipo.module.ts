import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesDelEquipoPageRoutingModule } from './detalles-del-equipo-routing.module';

import { DetallesDelEquipoPage } from './detalles-del-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesDelEquipoPageRoutingModule
  ],
  declarations: [DetallesDelEquipoPage]
})
export class DetallesDelEquipoPageModule {}
