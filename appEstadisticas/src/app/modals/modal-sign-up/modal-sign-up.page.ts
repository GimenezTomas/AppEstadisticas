import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ModalSignInPage } from '../modal-sign-in/modal-sign-in.page';

@Component({
  selector: 'app-modal-sign-up',
  templateUrl: './modal-sign-up.page.html',
  styleUrls: ['./modal-sign-up.page.scss'],
})
export class ModalSignUpPage implements OnInit {

  inputEmail: string = ""
  inputPassword: string = ""
  invalid: boolean = true
  userType = true
  managerStep1 = true
  name: string = ""
  lastname: string = ""
  birth: string = ""
  sport: string = ""

  constructor(private authSvc: AuthService, private router: Router,private modalController: ModalController, private menu: MenuController, private render: Renderer2) { }

  ngOnInit() {
  }

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
    console.log('abierto')
    this.menu.toggle(id)
  }

  checkFormSignIn(){
    if(this.checkEmail() && this.checkPassword()){
      this.invalid = true
    }else{
      this.invalid = false
    }
  }

  checkName(): Boolean{
    let onlyLetters=/[a-zA-Z]/
    if(this.name.length>1 && this.lastname.length>1 && onlyLetters.test(this.lastname) && onlyLetters.test(this.name)){
      return true
    }
    return false
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

  segmentChanged(ev: CustomEvent) {
    this.userType = Boolean(JSON.parse(ev.detail.value))
  }

  hide(){
    return this.userType
  }

  managerNextStep(){
    console.log(this.checkName() + " -> "+this.birth)
    if(this.checkName() && this.birth != ""){
      this.managerStep1 = false
      console.log('si nene')
    }else{
      this.managerStep1 = true
    }
  }

  async openModalSignIn(){
    const modal = await this.modalController.create({
      component: ModalSignInPage
    })

    return await modal.present()
  }
  
  signIn(){
    this.openModalSignIn()
    this.dismiss()
  }


  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.emailVerificado(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log("Error===>", error);
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
      this.router.navigate(['home']);
    } else {
     console.log("Verifique su cuenta con el email que le mandamos.")
    }
  }

}


