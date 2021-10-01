import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestoreDocument, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { isCordovaPackageJson } from '@ionic/cli';
import * as firebase from 'firebase';
import { observeOn } from 'rxjs/operators';
import { ModalBorrarDeporteComponent } from '../modal-borrar-deporte/modal-borrar-deporte.component';
import { ModalDeporteCreadoComponent } from '../modal-deporte-creado/modal-deporte-creado.component';
import { ModalDeporteexistenteComponent } from '../modal-deporteexistente/modal-deporteexistente.component';
import { ModalModificarDeporteComponent } from '../modal-modificar-deporte/modal-modificar-deporte.component';
import { AbmService } from '../services/abm.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-crear-deporte',
  templateUrl: './crear-deporte.page.html',
  styleUrls: ['./crear-deporte.page.scss'],
})



export class CrearDeportePage implements OnInit {
  public DeportesList:any[]=[];
  public nombreDeportes:any[]=[];
  public modificar:boolean=false;
  public userID;
  public form = [
    { val: 'Goles o Puntos', isChecked: false },
    { val: 'Faltas', isChecked: false },
    { val: 'Asistencias', isChecked: false }
  ];
  constructor(public toastController: ToastController,private ABMsvc:AbmService, private AUTHsvc:AuthService, private zone: NgZone, public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.form[0].isChecked);
    this.DeportesList=[];

  
    this.AUTHsvc.user$.forEach(i=>
      this.ABMsvc.afs.collection("deportes").where("uid","==",i.uid).get().then((data)=>{
        this.userID=i.uid;
        data.forEach(e => {
          this.DeportesList.push(e.data());
          this.nombreDeportes.push(e.data().nombreDeporte);
        })
    }))
  }

  reloadPage() { 
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
}

public deporteExistente(nombreDeporte):boolean{
  if(this.nombreDeportes.includes(nombreDeporte)){
    return true;
  }else{
    return false;
  }
}



  crearDeporte(nombreDeporte, cantEquipos, cantParticipantes):void{   
    if(nombreDeporte==""){
      this.presentToast();
    }else{
    if(this.deporteExistente(nombreDeporte.value)){
      console.log("existeeee");
      this.presentModalExistente();
    }else{
      let estadisticasRegistrar:Map<string,boolean>=new Map;
      this.form.forEach(element => {
          estadisticasRegistrar.set(element.val,element.isChecked);      
      });
      this.AUTHsvc.user$.forEach(i=> 
        this.ABMsvc.afs.collection("deportes").add({     
          nombreDeporte: nombreDeporte.value,
          cantEquipos: cantEquipos.value,         
          cantParticipantes: cantParticipantes.value,
          //estadisticasRegistrar: estadisticasRegistrar,  Arreglar que pueda guradar el Map
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
    }
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Nombre no puede estar vacío',
      duration: 2000
    });
    toast.present();
  }

  async presentModalExistente(){
    const modal = await this.modalController.create({
      component: ModalDeporteexistenteComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
   
  async presentModalModificar(idDoc:string,nombreDeporteModificar:string,cantEquiposModificar:string,cantParticipantesModificar:string){
    const modal = await this.modalController.create({
      component: ModalModificarDeporteComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': idDoc,
        'nombreDeporte': nombreDeporteModificar,
        'cantEquipos' : cantEquiposModificar,
        'cantParticipantes' : cantParticipantesModificar
      }
    });
    return await modal.present();
  }


  
 
  onEditar(idDoc,nombreModificar,cantEquipos,cantParticipantes){
   this.presentModalModificar(idDoc,nombreModificar,cantEquipos,cantParticipantes);
 }




} 