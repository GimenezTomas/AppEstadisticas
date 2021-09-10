import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  backdropVisible = false


  constructor() { }

  ngOnInit() {
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible
  }
}
