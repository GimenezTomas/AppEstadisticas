import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";
import { DocumentData, fromDocRef } from '@angular/fire/firestore';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class JugadoresService {
  idPrueba: string = "d9LN16EYgi6MaAmPF0Zl"; 

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
    let jugadores = await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('jugadores').doc(idJugador).get()
    return jugadores.data()
  } 
}
  