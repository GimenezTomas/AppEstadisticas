import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAgregarFaltaComponent } from '../modal-agregar-falta/modal-agregar-falta.component';
import { ModalAgregarGolComponent } from '../modal-agregar-gol/modal-agregar-gol.component';
import { ModalDeporteCreadoComponent } from '../modal-deporte-creado/modal-deporte-creado.component';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  public futbol=true;
  public basket=false;
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    console.log(screen.orientation.type);
    screen.orientation.lock("portrait-secondary");
  }

  onBasquet(){
    this.basket=true;
    this.futbol=false;
  }

  onFutbol(){
    this.basket=false;
    this.futbol=true;
  }

  async presentModalAgregarFalta() {
    const modal = await this.modalController.create({
      component: ModalAgregarFaltaComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalAgregarGol(){
    const modal = await this.modalController.create({
      component: ModalAgregarGolComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  onClickGol(equipo){
    console.log(equipo);  
    equipo.value=equipo.value+1;
  }
}
