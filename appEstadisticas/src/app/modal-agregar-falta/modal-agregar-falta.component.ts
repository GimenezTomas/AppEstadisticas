import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-agregar-falta',
  templateUrl: './modal-agregar-falta.component.html',
  styleUrls: ['./modal-agregar-falta.component.scss'],
})
export class ModalAgregarFaltaComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}


  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
