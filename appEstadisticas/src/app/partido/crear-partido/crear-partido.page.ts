import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalJugadoresPage } from 'src/app/modals/modal-jugadores/modal-jugadores.page';
import { PartidosService } from 'src/app/services/firebase/partidos.service';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear-partido.page.html',
  styleUrls: ['./crear-partido.page.scss'],
})
export class CrearPartidoPage implements OnInit {

  constructor(private modalController: ModalController, private partidoService: PartidosService) { }

  mimodal:any;
  rival: string
  fecha: string
  jugadores: any

  ngOnInit() {
  }

  async openModalJugadores(){
    const modal = await this.modalController.create({
      component: ModalJugadoresPage
    })

    await modal.present()

    this.mimodal = modal;
  }

  crearPartido(){
    this.partidoService.crearPartido(this.rival, this.fecha, this.jugadores, 'RIGtETEOcR9WyBN9MLL1', 'Equipo1')
  }
}
