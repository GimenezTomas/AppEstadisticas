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
  futbol=true;
  basket=false;
  backdropVisible = false 
  mimodal:any;
  partido: any;
  titulares: any = []
  suplentes: any = []
  width = 0
  height = 0
  algo=100;
  constructor(private platform: Platform, private jugadoresService: JugadoresService, private equipo:EquipoService, private modalController: ModalController) { 
    this.sasa();
  }

  ngOnInit() {
    this.openModalPartidos()
    //this.width = 600//(<HTMLInputElement>document.getElementById('cancha')).clientWidth
    //this.height =400// (<HTMLInputElement>document.getElementById('cancha')).clientHeight

  }
  sasa()
  {
    (<HTMLElement>document.getElementById('cont')).innerHTML="rojo"
    this.width = (<HTMLInputElement>document.getElementById('cancha')).clientWidth
    this.height = (<HTMLInputElement>document.getElementById('cancha')).clientHeight
    console.log(this.width);
  }
  onResize(event){
    this.width = (<HTMLInputElement>document.getElementById('cancha')).clientWidth
    this.height = (<HTMLInputElement>document.getElementById('cancha')).clientHeight

    
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
  }

  dismiss(){
    this.mimodal.dismiss()
  }

  onBasquet(){
    this.basket=true;
    this.futbol=false;
  }

  onFutbol(){
    this.basket=false;
    this.futbol=true;
  }
}
