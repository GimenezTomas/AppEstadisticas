import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalJugadoresPage } from 'src/app/modals/modal-jugadores/modal-jugadores.page';
import { PartidosService } from 'src/app/services/firebase/partidos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear-partido.page.html',
  styleUrls: ['./crear-partido.page.scss'],
})
export class CrearPartidoPage implements OnInit {

  constructor(private navCtrl: NavController,  private modalController: ModalController, private partidoService: PartidosService) { }

  mimodal:any;
  rival: string
  fecha: any; 
  jugadores: any

  ngOnInit() {
  }

  goBack(){
    this.crearPartido()
    this.navCtrl.back();
  }

  async openModalJugadores(){
    const modal = await this.modalController.create({
      component: ModalJugadoresPage
    })

    await modal.present()
    
    
    modal.onDidDismiss().then((data)=>{
      this.jugadores = data.data.jugadores
    })

    this.mimodal = modal;
  }

  crearPartido(){
    this.partidoService.crearPartido(this.rival, this.fecha, this.jugadores, 'RIGtETEOcR9WyBN9MLL1', 'Equipo1')
  }
}
