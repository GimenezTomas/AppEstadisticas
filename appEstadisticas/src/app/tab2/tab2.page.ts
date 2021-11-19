import { Component } from '@angular/core';
import { AbmService } from '../services/abm.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nombre: any;
  
  constructor( private authSvc: AuthService, private afs: AbmService) { 
    this.authSvc.user$.subscribe( async data => {
      let usuarios = await this.afs.afs.collection('users').doc(data.uid).get();
      this.nombre = usuarios.data().displayName;
    });
  }

  async logout(){
    this.authSvc.logout();
  }
  
}
