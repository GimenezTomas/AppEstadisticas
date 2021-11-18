import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ArcoComponent } from 'src/app/components/arco/arco.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-modal-agregar-gol',
  templateUrl: './modal-agregar-gol.component.html',
  styleUrls: ['./modal-agregar-gol.component.scss'],
})
export class ModalAgregarGolComponent implements OnInit {
  @Input() jugadores: any
  @Input() coords: any
  jugador: any
  jugadorA: any
  
  constructor(public timerService: TimerService,public popoverController: PopoverController, private modalController:ModalController) { }

  ngOnInit() {
    console.log(this.jugadores[0])
    this.jugador = this.jugadores[0]
    this.jugadorA = this.jugador
  }

  async presentPopover(ev: any, gol: boolean) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true, 
      componentProps: {data: this.jugadores}
    });
    await popover.present();

    popover.onDidDismiss().then( data =>{
      if(gol){
        this.jugador = data.data.jugador
      }else{
        this.jugadorA = data.data.jugador
      }
    })
    
    const { role } = await popover.onDidDismiss();
  }

  async presentArco(ev: any) {
    const modal = await this.modalController.create({
      component: ArcoComponent,
      cssClass: 'my-custom-class',
      componentProps: {data: this.jugadores}
    });
    await modal.present();

    modal.onDidDismiss().then( data =>{
      
    })
    
    const { role } = await modal.onDidDismiss();
  }

  onAgregar(){
    this.dismiss(true)
  }

  dismiss(gol: boolean) {
    this.modalController.dismiss({
      'dismissed': true, 'gol': gol
    });
  }
}
