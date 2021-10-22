import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-agregar-gol',
  templateUrl: './modal-agregar-gol.component.html',
  styleUrls: ['./modal-agregar-gol.component.scss'],
})
export class ModalAgregarGolComponent implements OnInit {
  public Jugadores:any[]=[];
  constructor(public modalController:ModalController) { }

  ngOnInit() {
    
  }


  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
