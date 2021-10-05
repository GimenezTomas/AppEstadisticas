import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';

@Injectable({
  providedIn: 'root'
})

export class clubService {

  constructor( private ABMsvc:AbmService) { 
    
  }

  crearClub(email: string, name: string){
    this.ABMsvc.afs.collection("clubes").add({
      nombre: name,
      mail: email 
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

  borrarClub(id: string){
    var query = this.ABMsvc.afs.collection("clubes").doc(id).delete().then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  editarNombreClub(id: string, nombre: string){
    var query = this.ABMsvc.afs.collection("clubes").doc(id).update({
      nombre: nombre
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}
