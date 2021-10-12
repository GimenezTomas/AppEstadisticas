import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.page.html',
  styleUrls: ['./modal-editar.page.scss'],
})
export class ModalEditarPage implements OnInit {
  @Input() idClub:string;
  @Input() jugador:object;
  @Input() idJugador:string;
  @Input() jugadorN:object;
  
  
  constructor(private toastcontroller:ToastController,private modalController: ModalController, private jugadoresService: JugadoresService, private zone:NgZone) { }
  ngOnInit() {
    // console.log(this.idClub)
    // console.log(this.idJugador)
    // console.log(this.jugador)
    // console.log("Nombre Jugador! ",this.jugador) 
  }
  async editar(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion){
    if(nombre.value=="" || apellido.value==""){
      this.presentToast();
    }else{
    await this.jugadoresService.editar(this.idClub,this.idJugador, {
      nombre : nombre.value,
      apellido : apellido.value,
      nCamiseta : nCamiseta.value,
      nacimiento : nacimiento.value,
      peso : peso.value,
      altura : altura.value,
      posicion : posicion.value
    })
    console.log("edita")
    this.dismiss();
  }
  }
  reloadPage(){
    this.zone.runOutsideAngular(() => {
      location.reload();
  });
  }
  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentToast(){
    const toast = await this.toastcontroller.create({
      message: 'Nombre y Apellido no pueden estar vacío',
      duration: 3000
    });
    toast.present();
  }
}
