import { Component, OnInit } from '@angular/core';
import { AbmService } from '../services/abm.service';


@Component({
  selector: 'app-crear-deporte',
  templateUrl: './crear-deporte.page.html',
  styleUrls: ['./crear-deporte.page.scss'],
})


export class CrearDeportePage implements OnInit {
  public DeportesList:any[]=[];
  public modificar:boolean=false;
  public idDocumentoModificar:number;
  constructor(private ABMsvc:AbmService) { }

  ngOnInit() {
  }

  

  crearDeporte(nombreDeporte, cantEquipos, cantParticipantes):void{
    this.ABMsvc.afs.collection("deportes").add({
      nombreDeporte: nombreDeporte.value,
      cantEquipos: cantEquipos.value,
      cantParticipantes: cantParticipantes.value
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
    
    this.ABMsvc.afs.collection("deportes").onSnapshot((data)=>{
    data.forEach(e => {
      console.log(e.data());
      
        this.DeportesList.push(e.data());
    })})
    }
    
        

    onEliminarDeporte(id){
      this.ABMsvc.afs.collection("deportes").doc(id).delete().then(()=>{
        console.log("Documento borrado exitosamete");
      }).catch((error)=>{
        console.log("error ==>",error);
      });
   } 
   
  
 



  onEditar(idDoc){
   this.modificar = true;
   this.idDocumentoModificar=idDoc;
 }

 modificarDeporte(idDoc,nombreDeporte,cantEquipos,cantParticipantes){
  this.ABMsvc.afs.collection("deportes").doc(idDoc).update({
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
  this.modificar=false;
 }

}