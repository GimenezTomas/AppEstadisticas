import { Component, OnInit } from '@angular/core';
import { CrearDeportePage } from '../crear-deporte/crear-deporte.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-borrar-deporte',
  templateUrl: './modal-borrar-deporte.component.html',
  styleUrls: ['./modal-borrar-deporte.component.scss'],
})
export class ModalBorrarDeporteComponent implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  dismiss(){
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  
}
