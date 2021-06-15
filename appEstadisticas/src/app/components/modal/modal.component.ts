import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  inputEmail: string = ""
  inputPassword: string = ""

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
    this.menu.toggle(id)
  }

  checkFormSignIn(){
    if(this.checkEmail() && this.checkPassword()){
      console.log('papaqpap')
    }else{
      console.log('shhshshs')
    }
  }

  checkEmail(): Boolean{
    if(this.inputEmail.length>5 && this.inputEmail.includes('@')){
      if(this.inputEmail.indexOf('@') > 1 && this.inputEmail.substr(this.inputEmail.indexOf('@')).includes('.')){
        console.log('sisi')
        return true
      }
    }
    console.log('nono')
    return false
  }

  checkPassword(){
    let hasNumber = /\d/
    if(this.inputPassword.length>7 && hasNumber.test(this.inputPassword)){
      console.log('si')
      return true
    }
    console.log('no')
    return false
  }
}
