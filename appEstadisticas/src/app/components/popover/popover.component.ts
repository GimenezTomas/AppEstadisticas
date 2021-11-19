import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() data

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
    //this.data.push(null)
  }

  dismiss(jp: any){
    this.popoverController.dismiss({
      'dismissed': true, 'jugador': jp
    })
  }
}
