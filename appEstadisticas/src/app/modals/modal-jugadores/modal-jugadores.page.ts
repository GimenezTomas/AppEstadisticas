import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/services/firebase/equipo.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { PartidosService } from 'src/app/services/firebase/partidos.service';

@Component({
  selector: 'app-modal-jugadores',
  templateUrl: './modal-jugadores.page.html',
  styleUrls: ['./modal-jugadores.page.scss'],
})
export class ModalJugadoresPage implements OnInit {

  constructor(private modalController: ModalController, private partidosService: PartidosService, private equipoService: EquipoService) { }

  titular: boolean = false
  jugadoresTitulares: any = []
  jugadoresSuplentes: any = []
  cantJugadoresTitulares: number = 5
  cantJugadoresSuplentes: number = 5
  jugadores: any = []

  ngOnInit() {
    this.equipoService.getJugadoresEquipo('RIGtETEOcR9WyBN9MLL1' , 'Equipo1').then(doc => { console.log(doc);this.jugadores = doc })
  }

  dismiss(){
    let jugadores = []

    this.jugadoresTitulares.forEach(element => {
      jugadores.push({'id':element, 'titular': true})
    });
    this.jugadoresSuplentes.forEach(element => {
      jugadores.push({'id':element, 'titular': false})
    });

    this.modalController.dismiss({
      'dismissed': true, 'jugadores': jugadores
    })
  }

  seleccionarJugador(idJugador: any){
    if(!this.jugadoresTitulares.includes(idJugador) && !this.jugadoresSuplentes.includes(idJugador) && this.jugadoresTitulares.length < this.cantJugadoresTitulares){
      if(this.titular){
        this.jugadoresTitulares.push(idJugador)
      }else{
        this.jugadoresSuplentes.push(idJugador)
      }
    }else if(this.titular){
      this.jugadoresTitulares = this.jugadoresTitulares.filter(obj => obj !== idJugador)
    }else{
      this.jugadoresSuplentes = this.jugadoresSuplentes.filter(obj => obj !== idJugador)
    }
  }

  clickTitular(){
    this.titular = !this.titular
  }
}
