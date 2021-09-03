import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { observeOn } from 'rxjs/operators';
import { ModalBorrarDeporteComponent } from '../modal-borrar-deporte/modal-borrar-deporte.component';
import { ModalDeporteCreadoComponent } from '../modal-deporte-creado/modal-deporte-creado.component';
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
  constructor(private ABMsvc:AbmService, private AUTHsvc:AuthService, private zone: NgZone, public modalController: ModalController) { }

  ngOnInit() {

    this.DeportesList=[];

  
    this.AUTHsvc.user$.forEach(i=>
      this.ABMsvc.afs.collection("deportes").where("uid","==",i.uid).get().then((data)=>{
        data.forEach(e => {
          this.DeportesList.push(e.data());
        })
    }))
  }

  reloadPage() { 
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
}
  

  crearDeporte(nombreDeporte, cantEquipos, cantParticipantes):void{
    if(this.deporteExistente(nombreDeporte)){
    this.AUTHsvc.user$.forEach(i=> 
      this.ABMsvc.afs.collection("deportes").add({     
        nombreDeporte: nombreDeporte.value,
        cantEquipos: cantEquipos.value,         
        cantParticipantes: cantParticipantes.value,
        uid: i.uid
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this.presentModalCreado();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      })
    ); 
    }else{
      
    }
    
  }

  async presentModalCreado() {
    const modal = await this.modalController.create({
      component: ModalDeporteCreadoComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalBorrar(nombreDeporte:string) {
    const modal = await this.modalController.create({
      component: ModalBorrarDeporteComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': nombreDeporte,
      }
    });
    return await modal.present();
  }

  
   
  deporteExistente(nombreDeporte:string):boolean{
    this.ABMsvc.afs.collection("deportes").where("nombreDeporte","==",nombreDeporte).get()
    .then((data => {
      if(data!=null){
        return true;
      }else{
          return false;
      }}))
    .catch((error => {
      console.error("Error => ",error);
      return false;
    }))
    return false;
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