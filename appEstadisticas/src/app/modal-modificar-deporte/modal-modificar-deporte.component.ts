import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AbmService } from '../services/abm.service';

@Component({
  selector: 'app-modal-modificar-deporte',
  templateUrl: './modal-modificar-deporte.component.html',
  styleUrls: ['./modal-modificar-deporte.component.scss'],
})
export class ModalModificarDeporteComponent implements OnInit {
  @Input() id: string;
  @Input() nombreDeporte: string;
  @Input() cantEquipos: string;
  @Input() cantParticipantes: string;
  constructor(private modalController:ModalController, private zone:NgZone, private ABMsvc:AbmService) { }

  ngOnInit() {}

  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
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
   }
  
}
