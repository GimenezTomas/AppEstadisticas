import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";
import { DocumentData, fromDocRef } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { EquipoService } from './equipo.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class JugadoresService {

  constructor(private ABMsvc:AbmService) { }
  async agregar(idClub: string, jugador: any){
    let doc = await this.ABMsvc.afs.collection("clubes").doc(idClub).collection('jugadores').add({
      nombre : jugador.nombre,
      apellido : jugador.apellido,
      nCamiseta : jugador.nCamiseta,
      nacimiento : jugador.nacimiento,
      peso : jugador.peso,
      altura : jugador.altura,
      posicion : jugador.posicion,  
      equipos : jugador.equipos
    })
    return {'id': doc.id,'nCamiseta':jugador.nCamiseta};
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
  editar(idClub:string, idJugador:string, jugadorN:any){
    console.log(jugadorN)
    console.log(idJugador)
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('jugadores').doc(idJugador).update({
      nombre : jugadorN.nombre,
      apellido : jugadorN.apellido,
      nCamiseta : jugadorN.nCamiseta,
      nacimiento : jugadorN.nacimiento,
      peso : jugadorN.peso,
      altura : jugadorN.altura,
      posicion : jugadorN.posicion,
      equipos : jugadorN.equipos
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
    let equipo = await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('equipos').doc(idEquipo).get();
    let idJugadores:Array<string> = []
    equipo.data().jugadores.forEach(element => {
      idJugadores.push(element.id);
    });
    return await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('jugadores').where('__name__','in',idJugadores).get();
  }
}
  