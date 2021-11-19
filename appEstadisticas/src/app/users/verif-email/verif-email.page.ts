import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.page.html',
  styleUrls: ['./verif-email.page.scss'],
})
export class VerifEmailPage implements OnInit {

  user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) {}

  ngOnInit() {}

  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ngOnDestroy(): void {
    this.authSvc.logout();
  }
}

