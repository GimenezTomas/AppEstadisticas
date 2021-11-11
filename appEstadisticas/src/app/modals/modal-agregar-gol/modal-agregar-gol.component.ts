import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-modal-agregar-gol',
  templateUrl: './modal-agregar-gol.component.html',
  styleUrls: ['./modal-agregar-gol.component.scss'],
})
export class ModalAgregarGolComponent implements OnInit {
  @Input() jugadores: any
  @Input() coords: any
  @Input() tiempo: any
  jugador: any
  
  constructor(public popoverController: PopoverController, private modalController:ModalController) { }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true, 
      componentProps: {data: this.jugadores}
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    
    popover.onDidDismiss().then((data)=>{
      this.jugador = data.data.jugador
    })
    
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
