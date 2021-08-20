import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';

@Injectable({
  providedIn: 'root'
})

export class EquipoService {

  constructor( private ABMsvc:AbmService) {}

  crearEquipo(nombre: string, deporte: string, id: string){
    this.ABMsvc.afs.collection('clubes').doc(id).collection('equipos').add({
      nombre: nombre,
      deporte: deporte
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}
