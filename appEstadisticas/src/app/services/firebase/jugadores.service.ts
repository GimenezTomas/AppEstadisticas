import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";
import { DocumentData, fromDocRef } from '@angular/fire/firestore';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class JugadoresService {

  constructor(private ABMsvc:AbmService) { }
  agregar(idClub: string, jugador: any) {
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('jugadores').add({
      nombre : jugador.nombre,
      apellido : jugador.apellido,
      nCamiseta : jugador.nCamiseta,
      nacimiento : jugador.nacimiento,
      peso : jugador.peso,
      altura : jugador.altura,
      posicion : jugador.posicion
    }).then(() => {
        console.log("Document written");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }
  borrar(idClub: string, idJugador:string){
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('jugadores').doc(idJugador).delete( 
    ).then(() => {
      console.log("Documento Borrado con exito :) ");
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  }); 
  }
  editar(idClub: string, idJugador:string, jugadorN: any){
    console.log(jugadorN)
    console.log(idJugador)
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('jugadores').doc(idJugador).update({
      nombre : jugadorN.nombre,
      apellido : jugadorN.apellido,
      nCamiseta : jugadorN.nCamiseta,
      nacimiento : jugadorN.nacimiento,
      peso : jugadorN.peso,
      altura : jugadorN.altura,
      posicion : jugadorN.posicion
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  }); 
  }

  async jugadorPorId(idClub:string, idJugador:string){
    let jugadores = await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('jugadores').doc(idJugador).get();
    return jugadores.data();
  }

  async jugadoresDeUnClub(idClub:string){
    return await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('jugadores').get();
  }

  async jugadoresDeUnEquipo(idClub:string, idEquipo:string){
    let jugadores = await this.jugadoresDeUnClub(idClub);
    let equipo = await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('equipos').doc(idEquipo).get();
    // console.log(equipo.data().Jugadores[0].id);
    let tmp:object = {}
    jugadores.forEach(jugador => {
      equipo.data().Jugadores.forEach(element => {
        if(jugador.id == element.id){
          Object.assign(tmp, jugador);
        }
      });
    });
    for(let jugador in tmp){
      console.log(typeof tmp[jugador]);
    }
  }
}
  