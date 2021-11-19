import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ArcoComponent } from 'src/app/components/arco/arco.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { EstadisticasService } from 'src/app/services/firebase/estadisticas.service';
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
  sector: any
  
  constructor( private estadisticasService: EstadisticasService, private timerService: TimerService, private popoverController: PopoverController, private modalController:ModalController) { }

  ngOnInit() {
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
      this.sector = data.data.sector
    })
    
    const { role } = await modal.onDidDismiss();
  }

  onAgregar(){
    this.estadisticasService.agregarAJugador('RIGtETEOcR9WyBN9MLL1', this.jugador.id, {})
    this.dismiss(true)
  }

  dismiss(gol: boolean) {
    this.modalController.dismiss({
      'dismissed': true, 'gol': gol
    });
  }
}
