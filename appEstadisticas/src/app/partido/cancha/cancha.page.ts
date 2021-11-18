import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalElegirPartidoPage } from 'src/app/modals/modal-elegir-partido/modal-elegir-partido.page';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { EquipoService } from '../../services/firebase/equipo.service';
import { PartidosService } from '../../services/firebase/partidos.service';

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

  constructor(private jugadoresService: JugadoresService, private equipo:EquipoService, private modalController: ModalController) { }

  ngOnInit() {
    this.openModalPartidos()
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible
  }

  async getPlantilla(){    
    this.partido.jugadores.forEach(async element => {
      console.log(element)
      let jugador = await this.jugadoresService.jugadorPorId('RIGtETEOcR9WyBN9MLL1', element.id)
      if(element.titular){
        this.titulares.push(jugador)
      }else{
        this.suplentes.push(jugador)
        console.log(jugador)
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
