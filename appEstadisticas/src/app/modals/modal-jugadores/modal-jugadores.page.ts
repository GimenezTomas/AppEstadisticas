import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PartidosService } from 'src/app/services/firebase/partidos.service';

@Component({
  selector: 'app-modal-jugadores',
  templateUrl: './modal-jugadores.page.html',
  styleUrls: ['./modal-jugadores.page.scss'],
})
export class ModalJugadoresPage implements OnInit {

  constructor(private modalController: ModalController, private partidosService: PartidosService) { }

  jugadoresSeleccionados: any = []
  jugadores: any = []

  ngOnInit() {
    this.getJugadores()
  }

  getJugadores(){
    
  }

  dismiss(){
    this.modalController.dismiss()
  }

  clickJugador(jugador: any){
    if(!this.jugadoresSeleccionados.includes(jugador) && this.jugadoresSeleccionados.includes(jugador) && this.jugadoresSeleccionados.length<6){
      this.jugadoresSeleccionados.push(jugador)
    }else{
      this.jugadoresSeleccionados.forEach((element: any,index: any)=>{
        if(element==jugador) this.jugadoresSeleccionados.splice(index,1);
      });
    }
  }
}
