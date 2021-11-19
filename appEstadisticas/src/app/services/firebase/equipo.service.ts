import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import { JugadoresService } from './jugadores.service';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})

export class EquipoService {

  constructor( private ABMsvc:AbmService, private jugadoresService: JugadoresService) {}

  
  crearEquipo(nombre: string, deporte: string, id: string){
    this.ABMsvc.afs.collection('clubes').doc(id).collection('equipos').doc(nombre).set({
      nombre: nombre,
      deporte: deporte
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  borrarEquipo(idClub: string, idEquipo: string){
    var query = this.ABMsvc.afs.collection("clubes").doc(idClub).collection("equipos").doc(idEquipo).delete().then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  editarCampoEquipo(idClub: string, idEquipo: string, body){
    this.ABMsvc.afs.collection('clubes').doc(idClub).collection('equipos').doc(idEquipo).update(
      body
    ).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
    /*
      body = {
        nombreCampo1: valor1,
        nombreCampo2: valor2
      }
    */
  }

  getNombresEquipos(idClub: string){ //se puede obtener solo los nombres??
    let nombres = []
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('equipos')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            nombres.push(doc.id)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return nombres
  }

  async getJugadoresEquipo(idClub: string, idEquipo: string){
    
    let idJugadores = []
    await this.ABMsvc.afs.collection('clubes').doc(idClub).collection('equipos').doc(idEquipo).get().then((docRef) => {
      idJugadores = docRef.data().jugadores 
    })
    .catch((error) => { })
    let jugadores = []

    idJugadores.forEach(async element => {
      jugadores.push({'id': element.id, 'jugador':await this.jugadoresService.jugadorPorId(idClub,element.id.toString())}) 
    });  
    console.log(jugadores)
    return jugadores 
  }

  agregarJugadorEquipo(idClub: any, idEquipo: any, body: any){
    console.log(body)
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('equipos').doc(idEquipo).update({
      jugadores: firebase.firestore.FieldValue.arrayUnion(body)
    }).then(() => {
        console.log("Document written");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }
  eliminarJugadorEquipo(idClub: string, idEquipo: any, body:any) {
    this.ABMsvc.afs.collection("clubes").doc(idClub).collection('equipos').doc(idEquipo).update({
      jugadores: firebase.firestore.FieldValue.arrayRemove(body)
    }).then(() => console.log("Document removed"))
      .catch((error) => console.error("Error deleting: ", error))
  }
}
