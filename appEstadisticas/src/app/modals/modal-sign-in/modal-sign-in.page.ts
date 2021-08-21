import { Component, OnInit, Input } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ModalSignUpPage } from '../modal-sign-up/modal-sign-up.page';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/services/firebase/equipo.service';

@Component({
  selector: 'app-modal-sign-in',
  templateUrl: './modal-sign-in.page.html',
  styleUrls: ['./modal-sign-in.page.scss'],
})

export class ModalSignInPage implements OnInit {

  inputEmail: string = ""
  inputPassword: string = ""
  invalid: boolean = true

  constructor(private equipo: EquipoService, private authSvc:AuthService, private modalController: ModalController, private menu: MenuController, private router: Router) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss()
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  openMenu(id){
    this.menu.toggle(id)
  }

  checkFormSignIn(){
    if(this.checkEmail() && this.checkPassword()){
      this.invalid = true
    }else{
      this.invalid = false
    }
  }

  checkEmail(): Boolean{
    if(this.inputEmail.length>5 && this.inputEmail.includes('@')){
      if(this.inputEmail.indexOf('@') > 1 && this.inputEmail.substr(this.inputEmail.indexOf('@')).includes('.')){
        return true
      }
    }
    return false
  }

  checkPassword(){
    let hasNumber = /\d/
    if(this.inputPassword.length>7 && hasNumber.test(this.inputPassword)){
      return true
    }
    return false
  }

  async openModalSignUp(){
    const modal = await this.modalController.create({
      component: ModalSignUpPage
    })

    return await modal.present()
  }

  signUp(){
    this.openModalSignUp()
    this.dismiss()
  }

  async onLogin(email,password){
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.emailVerificado(user);
        this.redirectUser(isVerified);
      }
      
    } catch (error) {
      console.log("error-->",error);
      
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.emailVerificado(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.dismiss()
      this.equipo.getNombresEquipos('RIGtETEOcR9WyBN9MLL1')
      this.router.navigate(['home']);
    } else {
      console.log("Verifique su cuenta con el email que le mandamos.");
    }
  }
}
