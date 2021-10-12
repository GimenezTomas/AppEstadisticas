import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AbmService } from 'src/app/services/abm.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController,private authSvc: AuthService, private router: Router, private afs: AbmService, private angularFirestore:AngularFirestore) { }

  ngOnInit() {
  }

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    //var entrenadores = this.afs.afs.collection("entrenadores").doc(this.authSvc.uid).get();
    if (isVerified) {
      var clubes = this.afs.afs.collection("clubes").doc(this.authSvc.uid).get();
      if(!clubes){
        this.router.navigate(['eleccion-usuario']);
      }
      else{
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['verif-email']);
    }
  }
}
