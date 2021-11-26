import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalElegirPartidoPage } from 'src/app/modals/modal-elegir-partido/modal-elegir-partido.page';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { EquipoService } from '../../services/firebase/equipo.service';
import { BehaviorSubject } from 'rxjs';
import { ModalAccionPage } from 'src/app/modals/modal-accion/modal-accion.page';
import { TimerService } from 'src/app/services/timer.service';

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
  homeScore = 0
  awayScore = 0

  constructor(private timerService: TimerService, private platform: Platform, private jugadoresService: JugadoresService, private equipo:EquipoService, private modalController: ModalController) { 
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
       jugador.id = element.id
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
  
  async presentModalAcciones(x1:number, y1:number, x2:number, y2:number, i: number, j: number){
    const modal = await this.modalController.create({
      component: ModalAccionPage,
      cssClass: 'my-custom-class',
      componentProps:{
        jugadores: this.titulares,
        coords: [x1,y1,x2,y2],
        home: this.homeScore,
        away: this.awayScore,
        ubiX: i,
        ubiY: j,
        partido: this.partido
      }
    });

    modal.onDidDismiss().then(async (data) => {
      console.log(data.data.home)
      this.homeScore = data.data.home 
      this.awayScore = data.data.away
      this.timerService.startTimer(90, this.timerService.timer)
      this.dismiss()
    })

    return await modal.present();
  }

  posesionH(){
    return Math.round(this.timerService.posHome * 100 / this.timerService.timer)
  }

  posesionA(){
    return Math.round(this.timerService.posAway * 100 / this.timerService.timer)
  }
}
