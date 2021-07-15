import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseClubService {

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
}
