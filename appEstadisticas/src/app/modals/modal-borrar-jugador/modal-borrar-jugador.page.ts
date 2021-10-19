import { Component, NgZone, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-borrar-jugador',
  templateUrl: './modal-borrar-jugador.page.html',
  styleUrls: ['./modal-borrar-jugador.page.scss'],
})
export class ModalBorrarJugadorPage implements OnInit {

  constructor(private modalController: ModalController, private zone:NgZone) { }

  ngOnInit() {
  }
  dismiss(borra:boolean){
    this.modalController.dismiss({
      'dismissed': true,
      'borra': borra
    });
  }
}
