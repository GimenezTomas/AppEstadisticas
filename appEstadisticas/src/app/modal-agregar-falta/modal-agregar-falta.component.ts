import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-agregar-falta',
  templateUrl: './modal-agregar-falta.component.html',
  styleUrls: ['./modal-agregar-falta.component.scss'],
})
export class ModalAgregarFaltaComponent implements OnInit {
  public Jugadores:any[]=[];
  constructor(public modalController:ModalController) { }

  ngOnInit() {
    this.Jugadores.push("a");
    this.Jugadores.push("a");
    
  }
  onAgregar(){
    this.dismiss();
  }

  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
