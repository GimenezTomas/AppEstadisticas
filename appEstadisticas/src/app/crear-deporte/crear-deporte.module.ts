import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearDeportePageRoutingModule } from './crear-deporte-routing.module';

import { CrearDeportePage } from './crear-deporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearDeportePageRoutingModule
  ],
  declarations: [CrearDeportePage]
})
export class CrearDeportePageModule {}
