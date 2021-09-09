import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanchaPageRoutingModule } from './cancha-routing.module';

import { CanchaPage } from './cancha.page';
import { PruebaModule } from '../components/prueba.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanchaPageRoutingModule,
    PruebaModule
  ],
  declarations: [CanchaPage]
})
export class CanchaPageModule {}
