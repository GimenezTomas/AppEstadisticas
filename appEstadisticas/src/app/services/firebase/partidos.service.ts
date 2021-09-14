import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";
 
@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private ABMsvc:AbmService) {}

  crearPartido(rival: string, fecha: string, jugadores: any, id: string, nombreEquipo:string, idPartido:string){
    this.ABMsvc.afs.collection('clubes').doc(id).collection('equipos').doc(nombreEquipo).update({
      partidos: firebase.firestore.FieldValue.arrayUnion({
        rival: rival,
        fecha: fecha,
        jugadores: jugadores,
        resultado: null,
        id: idPartido
      })
      }).then(() => {
        console.log("Document written");
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

  getProximosPartidos(idClub: string, idEquipo:string){
    let partidos = []
    this.ABMsvc.afs.collection("clubes").doc('RIGtETEOcR9WyBN9MLL1').collection('equipos')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            partidos.push(doc.data().partidos)
            console.log(doc.data().partidos)
                                                       });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return partidos
  }

  getPlantilla(idClub: string, idEquipo: string, idPartido){
    this.ABMsvc.afs.collection("clubes").doc('RIGtETEOcR9WyBN9MLL1').collection('equipos').doc(idEquipo)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data().partidos)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
}
