import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";
import { fromDocRef } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class JugadoresService { 

  constructor(private ABMsvc:AbmService) { }

  agregar(idClub: string, body: any) {
   this.ABMsvc.afs.collection("clubes").doc(idClub).update({
      jugadores: firebase.firestore.FieldValue.arrayUnion(body)
      }).then(() => {
        console.log("Document written");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }
  borrar(idClub: string, jugador: object){
    this.ABMsvc.afs.collection("clubes").doc(idClub).update({

      jugadores: firebase.firestore.FieldValue.arrayRemove(jugador)
    }).then(() => {
      console.log("Documento Borrado con exito :) ");
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  }); 
  }
  editar(idClub: string, jugador: object, jugadorN: object){
    this.ABMsvc.afs.collection("clubes").doc(idClub).update({

      jugadores: firebase.firestore.FieldValue.arrayRemove(jugador)
    }).then(() => {
      console.log("Borro el documento a modificar");
      console.log(jugadorN)
      this.ABMsvc.afs.collection("clubes").doc(idClub).update({
        jugadores: firebase.firestore.FieldValue.arrayUnion(jugadorN)
      }).then(() =>{
        console.log("Documento Añadido exitosamente :)")
      }).catch((error) => {
        console.error("Error adding document: ", error)
      })
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  }); 
  }
  ver(){

  }
}
