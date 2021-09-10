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
  borrar(idClub: string, doc: number){
    this.ABMsvc.afs.collection("clubes").doc(idClub).update({

      jugadores: firebase.firestore.FieldValue.arrayRemove()
    }).then(() => {
      console.log("Documento Borrado con exito :) ");
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  }); 
  }
  editar(){

  }
  ver(){

  }
}
