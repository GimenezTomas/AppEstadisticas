import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { ModalComponent } from '../components/modal/modal.component';
//import { ModalRegistroComponent } from '../components/modal-registro/modal-registro.component';
import { ModalSignInPage } from '../modals/modal-sign-in/modal-sign-in.page';
import { ModalSignUpPage } from '../modals/modal-sign-up/modal-sign-up.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalController: ModalController) {}

  async openModalSignIn(){
    const modal = await this.modalController.create({
      component: ModalSignInPage
    })

    return await modal.present()
  }
  
  async openModalSignUp(){
    const modal = await this.modalController.create({
      component: ModalSignUpPage
    })

    return await modal.present()
  }
}
