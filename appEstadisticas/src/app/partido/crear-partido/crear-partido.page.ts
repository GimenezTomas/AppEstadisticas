import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalJugadoresPage } from 'src/app/modals/modal-jugadores/modal-jugadores.page';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear-partido.page.html',
  styleUrls: ['./crear-partido.page.scss'],
})
export class CrearPartidoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  mimodal:any;

  ngOnInit() {
  }

  async openModalJugadores(){
    const modal = await this.modalController.create({
      component: ModalJugadoresPage
    })

    await modal.present()

    this.mimodal = modal;
  }
}
