import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private ABMsvc:AbmService) {}

  /*crearPartido(rival: string, fecha: string, jugadores: any, id: string, nombreEquipo:string){
    this.ABMsvc.afs.collection('clubes').doc(id).collection('equipos').doc(nombreEquipo).set({
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
  }

  getNombresEquipos(idClub: string){ //se puede obtener solo los nombres??
    let nombres = []
    this.ABMsvc.afs.collection("clubes").doc('RIGtETEOcR9WyBN9MLL1').collection('equipos')
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
  }*/
}
