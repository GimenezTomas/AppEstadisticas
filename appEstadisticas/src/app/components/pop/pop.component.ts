import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss'],
})
export class PopComponent implements OnInit {
  @Input()entrenadores;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() { }

  dismiss(entr: any){
    this.popoverController.dismiss({
      'dismissed': true, 'trainer': entr
    })
  }

}
