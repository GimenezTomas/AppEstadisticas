import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_g } from '@angular/platform-browser';
import { GestureController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read:ElementRef}) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();

  isOpen = false;
  openHeight =  0;

  constructor(private plt: Platform, private gestureCtrl: GestureController ) { }

  async ngAfterViewInit() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height()/100*70)
    
    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
        console.log(ev)
        if(ev.deltaY < -this.openHeight) return;
        drawer.style.transform = `translateY(${ev.deltaY}px)`
      },
      onEnd: ev =>{
        console.log('end: ', ev)
        
      }
    });
    gesture.enable(true)
  }

  toggleDrawer(){

  }

}
