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
  @Input() jugadores
  @Input() coords
  @Input() away
  @Input() home

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(gol: boolean){
    this.modalController.dismiss({
      'dismissed': true, 'gol': gol
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
        jugadores: this.jugadores,
        coords: this.coords
      }
    });
    modal.onDidDismiss().then(data => {
      this.dismiss(true)
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
