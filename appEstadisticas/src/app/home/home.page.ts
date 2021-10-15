import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { IonInfiniteScroll } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  noticias: any[] = Array(20)

  constructor(private menu: MenuController, private router: Router, public popoverController: PopoverController, private authSvc: AuthService) { 
    if(this.authSvc.esClub == false){
      this.router.navigate(['/eleccion-usuario'])
    }
   }

  async presentPopover(ev: any) {
    console.log("entro")
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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

  openMenu(){
    this.menu.toggle("equiposMenu")
  }


  ngOnInit() {
  }

  loadData(event) {
    /*setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);*/
  }

}
