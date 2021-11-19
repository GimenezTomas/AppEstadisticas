import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { IonInfiniteScroll } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { EquiposComponent } from "src/app/components/equipos/equipos.component";
import { EquipoService } from '../services/firebase/equipo.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  noticias: any[] = Array(20)
  equipos: any;
  equipo: any;

  constructor(private menu: MenuController, private router: Router, public popoverController: PopoverController, public equipoService: EquipoService, public authSvc: AuthService) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: EquiposComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {equipos: this.equipos}
    });
    await popover.present();

    popover.onDidDismiss().then((data)=>{
      this.equipo = data.data.team
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


  async ngOnInit() {
    if(this.authSvc.esEntrenador){
      this.equipos = await this.equipoService.getNombresEquipos(await this.authSvc.getEntrenador());
    }
    else{
      this.equipos = await this.equipoService.getNombresEquipos(this.authSvc.uid);
    }
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
