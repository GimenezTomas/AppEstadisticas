import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  public futbol=true;
  public basket=false;
  constructor(private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    console.log(this.screenOrientation.type);
  }

  onBasquet(){
    this.basket=true;
    this.futbol=false;
  }

  onFutbol(){
    this.basket=false;
    this.futbol=true;
  }
}
