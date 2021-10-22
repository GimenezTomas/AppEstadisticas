import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalElegirPartidoPage } from 'src/app/modals/modal-elegir-partido/modal-elegir-partido.page';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { EquipoService } from '../../services/firebase/equipo.service';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  refresh = false
  backdropVisible = false 
  mimodal:any;
  partido: any;
  titulares: any = []
  suplentes: any = []
  width = 0
  height = 0
  algo=100;
  constructor(private platform: Platform, private jugadoresService: JugadoresService, private equipo:EquipoService, private modalController: ModalController) { 
  }

  ngOnInit() {
    this.openModalPartidos()
  }
  refreshMap()
  {
    this.width = (<HTMLInputElement>document.getElementById('cancha')).clientWidth
    this.height = (<HTMLInputElement>document.getElementById('cancha')).clientHeight;
    this.refresh = false
    this.refresh = true
  }
  onResize(event){
    this.width = (<HTMLInputElement>document.getElementById('cancha')).clientWidth
    this.height = (<HTMLInputElement>document.getElementById('cancha')).clientHeight
    this.refreshMap()
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible
  }

  async getPlantilla(){    
    this.partido.jugadores.forEach(async element => {
      let jugador = await this.jugadoresService.jugadorPorId('RIGtETEOcR9WyBN9MLL1', element.id)
      if(element.titular){
        this.titulares.push(jugador)
      }else{
        this.suplentes.push(jugador)
      }
    });
  }

  async openModalPartidos(){
    const modal = await this.modalController.create({
      component: ModalElegirPartidoPage
    })

    await modal.present()
    
    modal.onDidDismiss().then(async (data)=>{
      this.partido = data.data.partido
      this.getPlantilla()
    })

    this.mimodal = modal;
    this.refreshMap()
  }

  dismiss(){
    this.mimodal.dismiss()
  }
}
