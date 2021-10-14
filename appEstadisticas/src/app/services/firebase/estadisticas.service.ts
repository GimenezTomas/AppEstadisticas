import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { AbmService } from '../abm.service';
//const FieldValue = require('firebase-admin').firestore.FieldValue;

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private ABMsvc: AbmService) {
  }

  agregarGenerales(idClub:string,idEquipo:string,estadisticas){
    console.log(estadisticas)
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).update({
      'estadisticasGenerales': firebase.firestore.FieldValue.arrayUnion(estadisticas)
    })
    console.log("entro")
  }

}
