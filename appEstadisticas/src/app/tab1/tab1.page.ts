
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
//import { ModalComponent } from '../components/modal/modal.component';
//import { ModalRegistroComponent } from '../components/modal-registro/modal-registro.component';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginPage } from '../users/login/login.page';
import { RegisterPage } from '../users/register/register.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  constructor(private modalController: ModalController, private router: Router) {}

  mimodal:any;

  async openModalSignIn(){
    const modal = await this.modalController.create({
      component: LoginPage
    })

    await modal.present()

    this.mimodal = modal;
  }

  dismiss(){
    this.mimodal.dismiss()
  }
  
  //openregister(){
  //  this.router.navigate(['/users/register']);
  //}
}
