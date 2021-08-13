import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AbmService } from '../services/abm.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crear-deporte',
  templateUrl: './crear-deporte.page.html',
  styleUrls: ['./crear-deporte.page.scss'],
})



export class CrearDeportePage implements OnInit {
  public DeportesList:any[]=[];
  public modificar:boolean=false;
  public idDocumentoModificar:string;
  public nombreDeporteModificar:string;
  constructor(private ABMsvc:AbmService, private AUTHsvc:AuthService) { }

  ngOnInit() {
  }

  

  crearDeporte(nombreDeporte, cantEquipos, cantParticipantes):void{
    this.ABMsvc.afs.collection("deportes").add({
      nombreDeporte: nombreDeporte.value,
      cantEquipos: cantEquipos.value,
      cantParticipantes: cantParticipantes.value,
      uid: this.AUTHsvc.user$
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  }

   mostrarTabla(){
    this.DeportesList=[];
    
    this.ABMsvc.afs.collection("deportes").where("nombreDeporte","!=",null).onSnapshot({includeMetadataChanges: true},(data)=>{
    data.forEach(e => {
      console.log(e.data());
      
        this.DeportesList.push(e.data());
    })})
    }
    
        

    onEliminarDeporte(id){
      var query = this.ABMsvc.afs.collection("deportes").where('nombreDeporte',"==",id);
      query.get().then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
          doc.ref.delete().then(()=>{
            console.log("Documento borrado exitosamente");
          }).catch((error)=>{
            console.log("error ==>",error);
          });
        })
      })
  
   } 
   
  
 



  onEditar(idDoc,nombreModificar){
   this.modificar = true;
   this.idDocumentoModificar=idDoc;
   this.nombreDeporteModificar=nombreModificar;
   
 }

 modificarDeporte(idDoc,nombreDeporte,cantEquipos,cantParticipantes){
  var query = this.ABMsvc.afs.collection("deportes").where('nombreDeporte',"==",idDoc);
  query.get().then(function(QuerySnapshot){
    QuerySnapshot.forEach(function(doc){
  doc.ref.update({
        nombreDeporte:nombreDeporte.value,
        cantEquipos:cantEquipos.value,
        cantParticipantes:cantParticipantes.value
  })
  .then(() => {
    console.log("Documento actualizado exitosamente");
})
.catch((error) => {
    console.error("error--->", error);
});
  
  })

  })
  this.modificar=false;
 }


}