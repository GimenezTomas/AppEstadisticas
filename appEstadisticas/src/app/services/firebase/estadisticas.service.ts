import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
//const FieldValue = require('firebase-admin').firestore.FieldValue;

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private ABMsvc: AbmService) {
  }

  async agregarGenerales(idClub:string,idEquipo:string,estadisticas){
    let stats = await this.getStatsGenerales(idClub,idEquipo);
    estadisticas = Object.assign(stats, estadisticas);
    console.log(estadisticas);
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).update({
      'estadisticasGenerales': estadisticas 
    });
  }

  async agregarAJugador(idClub:string, idJugador:string, estadisticas){
    let stats = await this.getStatsJugador(idClub,idJugador);
    estadisticas = Object.assign(stats, estadisticas);
    console.log(estadisticas)
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection("jugadores").doc(idJugador).update({
      'estadisticas' : estadisticas
    });
  }

  async getStatsGenerales(idClub:string, idEquipo:string){
    let equipo = await this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).get()
    return equipo.data().estadisticasGenerales;
  }
  
  async getStatsJugador(idClub:string, idJugador:string){
    let jugador = await this.ABMsvc.afs.collection("clubes").doc(idClub).collection("jugadores").doc(idJugador).get()
    return jugador.data().estadisticas;
  }
}
