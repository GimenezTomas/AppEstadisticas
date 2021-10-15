import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { ToastController } from '@ionic/angular';
import { EquipoService } from 'src/app/services/firebase/equipo.service';


@Component({
  selector: 'app-modal-crear-jugador',
  templateUrl: './modal-crear-jugador.component.html',
  styleUrls: ['./modal-crear-jugador.component.scss'],
})
export class ModalCrearJugadorComponent implements OnInit {
  @Input() idClub:string;

  constructor(private equipoService: EquipoService,private toastcontroller:ToastController,private modalController:ModalController, private jugadoresService: JugadoresService) { }

  ngOnInit() {}

  agregarJugador(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion):void{
    if(nombre.value =="" || apellido.value==""){
      this.presentToast();
    }else{ 
    this.jugadoresService.agregar(this.idClub, {
      nombre : nombre.value,
      apellido : apellido.value,
      nCamiseta : nCamiseta.value,
      nacimiento : nacimiento.value,
      peso : peso.value,
      altura : altura.value,
      posicion : posicion.value
    }).then( data => {
      this.equipoService.agregarJugadorEquipo(this.idClub, 'Equipo1', {id: data.id, nCamiseta: nCamiseta.value})
    })

    this.dismiss()
    }
  }
  dismiss() {
   
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
