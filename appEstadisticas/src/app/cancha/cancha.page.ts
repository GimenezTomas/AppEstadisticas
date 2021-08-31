import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  
  openNav: boolean = false
  closeNav: boolean = true


  constructor() { }

  ngOnInit() {
  }

  open(){
    this.openNav = !this.openNav
  }
  
  close(){
    this.closeNav = !this.closeNav
  }
}
