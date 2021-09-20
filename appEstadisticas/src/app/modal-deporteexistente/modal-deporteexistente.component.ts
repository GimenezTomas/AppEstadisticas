import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-deporteexistente',
  templateUrl: './modal-deporteexistente.component.html',
  styleUrls: ['./modal-deporteexistente.component.scss'],
})
export class ModalDeporteexistenteComponent implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
}
