import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  dismiss(eqp: any){
    this.popoverController.dismiss({
      'dismissed': true, 'equipo': eqp
    })
  }

}
