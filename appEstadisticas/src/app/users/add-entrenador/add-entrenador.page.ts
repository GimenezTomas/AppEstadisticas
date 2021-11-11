import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopComponent } from 'src/app/components/pop/pop.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-entrenador',
  templateUrl: './add-entrenador.page.html',
  styleUrls: ['./add-entrenador.page.scss'],
})
export class AddEntrenadorPage implements OnInit {

  constructor(public popoverController: PopoverController, private authSvc: AuthService) { }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

}
