import { Component, OnInit, Input } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
})

export class ModalRegistroComponent implements OnInit {

  inputEmail: string = ""
  inputPassword: string = ""
  invalid: boolean = true

  constructor(private modalController: ModalController, private menu: MenuController) { }

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
}

