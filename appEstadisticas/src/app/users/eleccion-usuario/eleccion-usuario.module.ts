import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EleccionUsuarioPageRoutingModule } from './eleccion-usuario-routing.module';

import { EleccionUsuarioPage } from './eleccion-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EleccionUsuarioPageRoutingModule
  ],
  declarations: [EleccionUsuarioPage]
})
export class EleccionUsuarioPageModule {}
