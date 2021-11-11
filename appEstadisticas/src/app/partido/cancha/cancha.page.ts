import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalElegirPartidoPage } from 'src/app/modals/modal-elegir-partido/modal-elegir-partido.page';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { EquipoService } from '../../services/firebase/equipo.service';
import { BehaviorSubject } from 'rxjs';
import { ModalAgregarFaltaComponent } from 'src/app/modals/modal-agregar-falta/modal-agregar-falta.component';
import { ModalAgregarGolComponent } from 'src/app/modals/modal-agregar-gol/modal-agregar-gol.component';
import { ModalAccionPage } from 'src/app/modals/modal-accion/modal-accion.page';

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
  time: BehaviorSubject<String> = new BehaviorSubject('00:00')
  timer = 0
  homeScore = 0
  awayScore = 0
  posesionHome = 0
  posesionAway = 0
  posesionAFavor: boolean = true

  constructor(private platform: Platform, private jugadoresService: JugadoresService, private equipo:EquipoService, private modalController: ModalController) { 
  }

  ngOnInit() {
    this.openModalPartidos()
  }

  startTimer(duration: number){
    this.timer = 0
    setInterval(() => {
      this.updateTimeValue(duration)
    }, 1000)
  }

  updateTimeValue(duration:number){
    let minutes:any = this.timer / 60
    let seconds:any = this.timer % 60

    minutes = String('0' + Math.floor(minutes)).slice(-2)
    seconds = String('0' + Math.floor(seconds)).slice(-2)
    
    const text = minutes + ":" + seconds
    this.time.next(text)

    ++this.timer

    if(this.posesionAFavor){
      this.posesionHome++
      /*let numero = (this.posesionHome * this.timer / 100)   
      let posesionHome = Math.round(numero * 100 / this.timer)
      console.log(numero)
      console.log(posesionHome)*/
    }else{
      this.posesionAway++
      /*let numero = (this.posesionAway * this.timer / 100) + 1
      let posesionAway = Math.round(numero * 100 / this.timer)*/
    }

    if(this.timer > duration * 60){
      this.startTimer(duration)
    }
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
  
  async presentModalAcciones(x1:number, y1:number, x2:number, y2:number){
    const modal = await this.modalController.create({
      component: ModalAccionPage,
      cssClass: 'my-custom-class',
      componentProps:{
        tiempo : this.timer,
        jugadores: this.titulares,
        coords: [x1,y1,x2,y2],
        home: this.homeScore,
        away: this.awayScore
      }
    });

    modal.onDidDismiss().then(async (data) => {
      this.homeScore = data.data.homeScore 
      this.awayScore = data.data.awayScore
      this.dismiss()
    })

    return await modal.present();
  }
}
