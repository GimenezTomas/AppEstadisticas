import { Component, Input, NgZone, OnInit } from '@angular/core';
import { CrearDeportePage } from '../crear-deporte/crear-deporte.page';
import { ModalController } from '@ionic/angular';
import { AbmService } from '../services/abm.service';

@Component({
  selector: 'app-modal-borrar-deporte',
  templateUrl: './modal-borrar-deporte.component.html',
  styleUrls: ['./modal-borrar-deporte.component.scss'],
})
export class ModalBorrarDeporteComponent implements OnInit {
  @Input() id: string;
  constructor(private modalController:ModalController,private ABMsvc:AbmService, private zone: NgZone) { }

  ngOnInit() {}

  dismiss(){
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  eliminarDeporte(){
    var query = this.ABMsvc.afs.collection("deportes").where('nombreDeporte',"==",this.id);
    var zona = this.zone;
    query.get().then(function(QuerySnapshot){
      QuerySnapshot.forEach(function(doc){
        doc.ref.delete().then(()=>{
          console.log("Documento borrado exitosamente");
          zona.runOutsideAngular(() => {
            location.reload();
        });
        }).catch((error)=>{
          console.log("error ==>",error);
        });
      });
    })

 } 

}
