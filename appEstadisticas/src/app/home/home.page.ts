import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { IonInfiniteScroll } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EquiposComponent } from "src/app/components/equipos/equipos.component";



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  noticias: any[] = Array(20)
  equipos: any;
  equipo: any;

  constructor(private menu: MenuController, private router: Router, public popoverController: PopoverController, private authSvc: AuthService) { }

  async presentPopover(ev: any) {
    this.equipos = await this.authSvc.getEquipos()
    const popover = await this.popoverController.create({
      component: EquiposComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {equipos: this.equipos}
    });
    await popover.present();

    popover.onDidDismiss().then((data)=>{
      this.equipo = data.data.equipo
    })

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
