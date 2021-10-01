import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";
 
@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private ABMsvc:AbmService) {}

  crearPartido(rival: string, fecha: string, jugadores: any, id: string, nombreEquipo:string){
    this.ABMsvc.afs.collection('clubes').doc(id).collection('equipos').doc(nombreEquipo).collection('partidos').add({
        rival: rival,
        fecha: fecha,
        jugadores: jugadores,
        resultado: null,
        estadisticas:""
      }).then(() => {
      console.log("Document written");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

  getProximosPartidos(idClub: string, idEquipo:string){
    let partidos = []
    this.ABMsvc.afs.collection("clubes").doc('RIGtETEOcR9WyBN9MLL1').collection('equipos').doc(idEquipo).collection('partidos')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          partidos.push(doc.data()) // filtrar por fechas
      });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return partidos
  }

  getPlantilla(idClub: string, idEquipo: string, idPartido){
    let partidos = []
    this.ABMsvc.afs.collection("clubes").doc('RIGtETEOcR9WyBN9MLL1').collection('equipos').doc(idEquipo).collection('partidos').doc('VwCeRP4dxz2AYXpKlumA').get().then((docRef) => {
      partidos = docRef.data().jugadores
      console.log(docRef.data().jugadores) 
    })
    .catch((error) => { })

    partidos.forEach(element => {
      element['data'] = "" /*lo de mijac*/
    });
  }
}
