import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-jugadores',
  templateUrl: './modal-jugadores.page.html',
  styleUrls: ['./modal-jugadores.page.scss'],
})
export class ModalJugadoresPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss()
  }
}
