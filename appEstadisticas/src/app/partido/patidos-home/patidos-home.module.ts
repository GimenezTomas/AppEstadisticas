import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatidosHomePageRoutingModule } from './patidos-home-routing.module';

import { PatidosHomePage } from './patidos-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatidosHomePageRoutingModule
  ],
  declarations: [PatidosHomePage]
})
export class PatidosHomePageModule {}
