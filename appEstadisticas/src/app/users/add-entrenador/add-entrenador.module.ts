import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEntrenadorPageRoutingModule } from './add-entrenador-routing.module';

import { AddEntrenadorPage } from './add-entrenador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEntrenadorPageRoutingModule
  ],
  declarations: [AddEntrenadorPage]
})
export class AddEntrenadorPageModule {}
