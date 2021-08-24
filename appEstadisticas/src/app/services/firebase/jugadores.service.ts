import { Injectable } from '@angular/core';
import { AbmService } from '../abm.service';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})

export class JugadoresService {

  constructor(private ABMsvc:AbmService) { }

  agregar(idClub: string, body: any){
   this.ABMsvc.afs.collection("clubes").doc(idClub).update({
      jugadores: firebase.firestore.FieldValue.arrayUnion(body)
  });
    
  }
}
