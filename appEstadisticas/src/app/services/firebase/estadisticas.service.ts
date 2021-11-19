import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { AbmService } from '../abm.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private ABMsvc: AbmService) {
  }

  agregarGenerales(idClub:string,idEquipo:string,estadisticas:object){
    for(let estadistica in estadisticas){
      this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).update({
        ['estadisticas.'+ estadistica] : estadisticas[estadistica] 
      });
    }
  }

  agregarAJugador(idClub:string, idJugador:string, estadisticas:object){
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('jugadores').doc(idJugador).update({
      estadisticas: firebase.firestore.FieldValue.arrayUnion(estadisticas)
    }).then(() => {
        console.log("Document written");
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

  async getStatsGenerales(idClub:string, idEquipo:string){
    let equipo = await this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).get()
    return equipo.data().estadisticas;
  }
  
  async getStatsJugador(idClub:string, idJugador:string){
    let jugador = await this.ABMsvc.afs.collection("clubes").doc(idClub).collection("jugadores").doc(idJugador).get()
    return jugador.data().estadisticas;
  }

  borrarGenerales(idClub:string, idEquipo:string, estadisticasABorrar:Array<string>){
    estadisticasABorrar.forEach(estadistica => {
      this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).update({
        ['estadisticas.'+ estadistica] : firebase.firestore.FieldValue.delete()
      });  
    });
  }

  borrarJugador(idClub:string, idJugador:string, estadisticasABorrar:Array<string>){
    estadisticasABorrar.forEach(estadistica => {
      this.ABMsvc.afs.collection("clubes").doc(idClub).collection("jugadores").doc(idJugador).update({
        ['estadisticas.'+ estadistica] : firebase.firestore.FieldValue.delete()
      });  
    });
  }
}
