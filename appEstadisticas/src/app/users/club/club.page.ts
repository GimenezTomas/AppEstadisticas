import { Component, OnInit } from '@angular/core';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage implements OnInit {

  constructor(private authSvc: AuthService, private afs: AbmService) { }

  ngOnInit() {
  }

  async registerClub(name) {
    try {
      this.authSvc.user$.subscribe(data => {
        this.afs.afs.collection('clubes').doc(data.uid).set({
        nombre: name.value,
        email: data.email,
      }).then((docref)=>console.log('guardado'))
      .catch((error)=>console.error(error))
    })
        //this.redirectUser(isVerified);
    } catch (error) {
      console.log('Error', error);
    }
  }

}
