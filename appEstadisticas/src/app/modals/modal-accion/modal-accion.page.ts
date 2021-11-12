import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAgregarFaltaComponent } from '../modal-agregar-falta/modal-agregar-falta.component';
import { ModalAgregarGolComponent } from '../modal-agregar-gol/modal-agregar-gol.component';

@Component({
  selector: 'app-modal-accion',
  templateUrl: './modal-accion.page.html',
  styleUrls: ['./modal-accion.page.scss'],
})
export class ModalAccionPage implements OnInit {
  @Input() tiempo
  @Input() jugadores
  @Input() coords
  @Input() away
  @Input() home

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentModalAgregarFalta() {
    
    const modal = await this.modalController.create({
      component: ModalAgregarFaltaComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalAgregarGol(){
    const modal = await this.modalController.create({
      component: ModalAgregarGolComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        tiempo : this.tiempo,
        jugadores: this.jugadores,
        coords: this.coords
      }
    });
 modal.onDidDismiss().then(data => {
      console.log('adentro')
      this.dismiss()
    })
    await modal.present();
    
   
  }

  onClickGolHome(){
    this.presentModalAgregarGol();
    this.home++;
  }

  onClickGolAway(){
    this.presentModalAgregarGol();
    this.away++;    
  }

}
