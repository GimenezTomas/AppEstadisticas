import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CrearDeportePageModule } from '../crear-deporte/crear-deporte.module';
import { CrearDeportePage } from '../crear-deporte/crear-deporte.page';
import { ModalDeporteexistenteComponent } from '../modal-deporteexistente/modal-deporteexistente.component';
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
  public nombreDeportes:any[]=[];
  public Posiciones:Array<string>;
  public posicionName:string= "";
  public form = [
    { val: 'Goles o Puntos', isChecked: false },
    { val: 'Faltas', isChecked: false },
    { val: 'Asistencias', isChecked: false },
    { val: 'Pases', isChecked: false }
  ];
  
  constructor(public toastController: ToastController, private modalController:ModalController, private zone:NgZone, private ABMsvc:AbmService, private AUTHsvc:AuthService) { }

  ngOnInit() {
    console.log(this.estadisticasRegistrar);
    
      this.form[0].isChecked=this.estadisticasRegistrar[0];
      this.form[1].isChecked=this.estadisticasRegistrar[1];
      this.form[2].isChecked=this.estadisticasRegistrar[2];
      this.form[3].isChecked=this.estadisticasRegistrar[3];

      this.AUTHsvc.user$.forEach(i=>
        this.ABMsvc.afs.collection("deportes").where("uid","==",i.uid).get().then((data)=>{
          data.forEach(element => {
            this.nombreDeportes.push(element.data().nombreDeporte);
            if (element.data().nombreDeporte==this.nombreDeporte) {
              this.Posiciones=element.data().posiciones;
              console.log(this.Posiciones);
              
            }
          });
        
      }))
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

  public deporteExistente(nombreDeporte):boolean{
    if(this.nombreDeportes.includes(nombreDeporte)){
      return true;
    }else{
      return false;
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      color:"danger",
      message: 'Ya existe esa Posición',
      duration: 3000
    });

    toast.present();
  }

  async presentToastVacio() {
    const toast = await this.toastController.create({
      color:"danger",
      message: 'El nombre no puede estar vacío',
      duration: 3000
    });
    toast.present();
  }

  async presentToastCamposVacios(){
    const toast = await this.toastController.create({
      color:"danger",
      message: 'Cantidad de Equipos o Particiapntes no puede estar vacío o incluir letras',
      duration: 3000
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

  
  agregarPosicion(){
    if (this.Posiciones.includes(this.posicionName)) {
      this.presentToast();
    }else if(this.posicionName==""){
      this.presentToastVacio()
    }else{
      this.Posiciones.push(this.posicionName.valueOf());
    }
  }
 
  eliminarPosicion(posicion:String){
    this.Posiciones.forEach((element,index)=>{
      if(element==posicion){
        this.Posiciones.splice(index,1);
      }
    });
  }

  modificarDeporte(idDoc,nombreDeporte,cantEquipos,cantParticipantes){
    if(nombreDeporte.value==""){
      this.presentToastVacio();
    }else{
    if(this.deporteExistente(nombreDeporte.value)){
      console.log("existeeee");
      this.presentModalExistente();
    }else if(cantEquipos.value=="" || cantParticipantes.value==""){
      this.presentToastCamposVacios();
    }else{
    var query = this.ABMsvc.afs.collection("deportes").where('nombreDeporte',"==",idDoc);
    var zona = this.zone;
    let posiciones = this.Posiciones;
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
          estadisticasRegistrar:estadisticasNuevas,
          posiciones:posiciones
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
  }
}
