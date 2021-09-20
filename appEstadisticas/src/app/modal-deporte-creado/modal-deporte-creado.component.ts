import { Component, NgZone, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-deporte-creado',
  templateUrl: './modal-deporte-creado.component.html',
  styleUrls: ['./modal-deporte-creado.component.scss'],
})
export class ModalDeporteCreadoComponent implements OnInit {

  constructor(private modalController:ModalController, private zone:NgZone) { }

  ngOnInit() {}


  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  onOK(){
    this.zone.runOutsideAngular(() => {
      location.reload();
  });
  }
}
