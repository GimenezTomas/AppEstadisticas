import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalElegirPartidoPage } from 'src/app/modals/modal-elegir-partido/modal-elegir-partido.page';
import { EquipoService } from '../../services/firebase/equipo.service';
import { PartidosService } from '../../services/firebase/partidos.service';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  
  backdropVisible = false 
  mimodal:any;
  partido: number = 230

  constructor(private equipo:EquipoService, private modalController: ModalController) { }

  ngOnInit() {
    this.openModalPartidos()
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible
  }

  async openModalPartidos(){
    const modal = await this.modalController.create({
      component: ModalElegirPartidoPage
    })

    await modal.present()
    
    modal.onDidDismiss().then((data)=>{
      this.partido = data.data.partido
    })

    this.mimodal = modal;
  }

  dismiss(){
    this.mimodal.dismiss()
  }


}
