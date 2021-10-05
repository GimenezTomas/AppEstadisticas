
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
//import { ModalComponent } from '../components/modal/modal.component';
//import { ModalRegistroComponent } from '../components/modal-registro/modal-registro.component';
import { ModalSignInPage } from '../modals/modal-sign-in/modal-sign-in.page';
import { ModalSignUpPage } from '../modals/modal-sign-up/modal-sign-up.page';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  constructor(private modalController: ModalController, /*private router: Router*/) {}

  mimodal:any;


  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
        return true;
      }
  }*/



  async openModalSignIn(){
    const modal = await this.modalController.create({
      component: ModalSignInPage
    })

    await modal.present()

    this.mimodal = modal;
  }

  dismiss(){
    this.mimodal.dismiss()
  }
  
  async openModalSignUp(){
    const modal = await this.modalController.create({
      component: ModalSignUpPage
    })

    return await modal.present()
  }
}
