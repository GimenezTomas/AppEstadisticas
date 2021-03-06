import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AbmService } from 'src/app/services/abm.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private authSvc: AuthService, private router: Router, private navCtrl: NavController, private afs: AbmService) {}

    ngOnInit() {}

    async onRegister(email, password) {
      try {
        const user = await this.authSvc.register(email.value, password.value);
        if (user) {
          const isVerified = this.authSvc.isEmailVerified(user);
          this.redirectUser(isVerified);
        }
      } catch (error) {
        console.log('Error', error);
      }
    }

    private redirectUser(isVerified: boolean): void {
      if (isVerified) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['verif-email']);
      }
    }
  }

