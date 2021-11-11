import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { clubService } from 'src/app/services/firebase/club.service'

@Component({
  selector: 'app-crear-jugador-modal',
  templateUrl: './crear-jugador-modal.page.html',
  styleUrls: ['./crear-jugador-modal.page.scss'],
})
export class CrearJugadorModalPage implements OnInit {
  @Input() idClub:string;
  private equipos: any[] = [];
  
  constructor(private toastcontroller:ToastController,private club:clubService, private ABMsvc:AbmService,private AUTHsvc: AuthService,private modalController:ModalController, private jugadoresService: JugadoresService) { }

  ngOnInit() {
    this.AUTHsvc.user$.subscribe(user =>{
      this.ABMsvc.afs.collection("clubes").doc(user.uid).collection("equipos").get().then(data => {
        data.forEach(element => {
          let equipo = element.data();
          equipo.id = element.id;
          console.log(equipo);
          this.equipos.push(equipo);
        });
      })
    })
  }

  agregarJugador(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion, equipo):void{
    console.log(equipo);
    if(nombre.value =="" || apellido.value==""){
      this.presentToast('Nombre y Apellido no pueden estar vacío');
    }else{ 
    this.jugadoresService.agregar(this.idClub, {
      nombre : nombre.value,
      apellido : apellido.value,
      nCamiseta : nCamiseta.value,
      nacimiento : nacimiento.value,
      peso : peso.value,
      altura : altura.value,
      posicion : posicion.value
    })
    if(equipo == true){

    }
    this.dismiss()
    }
  }
  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentToast(mensaje:string){
    const toast = await this.toastcontroller.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
