import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseClubService {

  constructor( private firestore: AngularFirestore) { }

  create(club: any){
    return this.firestore.collection('clubes').add(club)
  }

  updateNombre(nombre:string, idDoc:string){
    return this.firestore.collection('clubes').doc(idDoc).update({
      nombre: nombre 
    })
  }

  delete(idDoc:string){
    this.firestore.collection('users').doc(idDoc).delete()
    this.firestore.collection('clubes').doc(idDoc).delete()
  }
}
