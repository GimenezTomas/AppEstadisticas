import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalRegistroComponent } from '../components/modal-registro/modal-registro.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalController: ModalController) {}

  async openModalSignIn(){
    const modal = await this.modalController.create({
      component: ModalComponent
    })

    return await modal.present()
  }
  
  async openModalSignUp(){
    const modal = await this.modalController.create({
      component: ModalRegistroComponent
    })

    return await modal.present()
  }
}
