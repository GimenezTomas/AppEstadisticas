import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-arco',
  templateUrl: './arco.component.html',
  styleUrls: ['./arco.component.scss'],
})

export class ArcoComponent implements OnInit {

  sector = sector
  x1: number = 0
  x2: number = 0
  y1: number = 0
  y2: number = 0 

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.refreshMap()
  }

  dismiss(sector: number){
    console.log(sector)
    this.modalController.dismiss({
      'dismissed': true, 'sector': sector
    })
  }

  refreshMap()
  {
    this.x1 = (16.33*(<HTMLInputElement>document.getElementById('arco')).clientWidth)/100
    this.x2 = (<HTMLInputElement>document.getElementById('arco')).clientWidth - this.x1
    this.y1 = (20.5 * (<HTMLInputElement>document.getElementById('arco')).clientHeight)/100;
    this.y2 = (69.23 * (<HTMLInputElement>document.getElementById('arco')).clientHeight)/100;
  }

  onResize(event){
    this.refreshMap()
  }
}

export enum sector {
  supIzquierda = 1,
  centroSup=2,
  supDerecha = 3,
  centroIzq = 4,
  centroCentro = 5,
  centroDer = 6,
  infIzq = 7,
  infCentro = 8,
  infDer = 9
}