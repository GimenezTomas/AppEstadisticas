import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AbmService } from '../services/abm.service';
import { AuthService } from '../services/auth.service';

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
  @Input() estadisticasRegistrar: Array<boolean>;
  public form = [
    { val: 'Goles o Puntos', isChecked: false },
    { val: 'Faltas', isChecked: false },
    { val: 'Asistencias', isChecked: false },
    { val: 'Pases', isChecked: false }
  ];
  
  constructor(private modalController:ModalController, private zone:NgZone, private ABMsvc:AbmService, private AUTHsvc:AuthService) { }

  ngOnInit() {
    console.log(this.estadisticasRegistrar);
    
      this.form[0].isChecked=this.estadisticasRegistrar[0];
      this.form[1].isChecked=this.estadisticasRegistrar[1];
      this.form[2].isChecked=this.estadisticasRegistrar[2];
      this.form[3].isChecked=this.estadisticasRegistrar[3];
      
  }

  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  reloadPage(){
    this.zone.runOutsideAngular(() => {
      location.reload();
  });
  }


  modificarDeporte(idDoc,nombreDeporte,cantEquipos,cantParticipantes){
    var query = this.ABMsvc.afs.collection("deportes").where('nombreDeporte',"==",idDoc);
    var zona = this.zone;
    let estadisticasNuevas:Array<boolean>=[];
    estadisticasNuevas.push(this.form[0].isChecked);
    estadisticasNuevas.push(this.form[1].isChecked);
    estadisticasNuevas.push(this.form[2].isChecked);
    estadisticasNuevas.push(this.form[3].isChecked);
    query.get().then(function(QuerySnapshot){
      QuerySnapshot.forEach(function(doc){
    doc.ref.update({
          nombreDeporte:nombreDeporte.value,
          cantEquipos:cantEquipos.value,
          cantParticipantes:cantParticipantes.value,
          estadisticasRegistrar:estadisticasNuevas
    })
    .then(() => {
      console.log("Documento actualizado exitosamente");
      zona.runOutsideAngular(() => {
        location.reload();
    });
  })
  .catch((error) => {
      console.error("error--->", error);
  });
    
    })
  
    })
   }
  
}
