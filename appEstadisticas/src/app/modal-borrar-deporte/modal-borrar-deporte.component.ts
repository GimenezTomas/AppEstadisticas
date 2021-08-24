import { Component, Input, OnInit } from '@angular/core';
import { CrearDeportePage } from '../crear-deporte/crear-deporte.page';
import { ModalController } from '@ionic/angular';
import { AbmService } from '../services/abm.service';

@Component({
  selector: 'app-modal-borrar-deporte',
  templateUrl: './modal-borrar-deporte.component.html',
  styleUrls: ['./modal-borrar-deporte.component.scss'],
})
export class ModalBorrarDeporteComponent implements OnInit {
  @Input() nombreDeporte: string;
  constructor(private modalController:ModalController,private ABMsvc:AbmService) { }

  ngOnInit() {}

  dismiss(){
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  eliminarDeporte(){
    var query = this.ABMsvc.afs.collection("deportes").where('nombreDeporte',"==",this.nombreDeporte);
    query.get().then(function(QuerySnapshot){
      QuerySnapshot.forEach(function(doc){
        doc.ref.delete().then(()=>{
          console.log("Documento borrado exitosamente");
          this.reloadPage();
        }).catch((error)=>{
          console.log("error ==>",error);
        });
      })
    })

 } 

}
