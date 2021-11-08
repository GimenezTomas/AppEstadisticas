import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, Input} from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read:ElementRef}) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();

  @Input() suplentes: any = [];
  @Input() titulares: any = [];    
  
  isOpen = false;
  openHeight =  0;
  jugador1:any = null
  jugador2:any = null

  constructor(private plt: Platform, private gestureCtrl: GestureController) { }

  async ngAfterViewInit() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height()/100*80)
    
    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
        if(ev.deltaY < -this.openHeight) return;
        drawer.style.transform = `translateY(${ev.deltaY}px)`
      },
      onEnd: ev =>{
        if (ev.deltaY < -50 && !this.isOpen){
          drawer.style.transition = '.4s ease-out'
          drawer.style.transition = `translateY(${-this.openHeight}px)`
          this.openState.emit(true)
          this.isOpen = true
        }else if(ev.deltaY > 50 && this.isOpen){
          drawer.style.transition = '.4s ease-out'
          drawer.style.transition = ``
          this.openState.emit(false)
          this.isOpen = false
        }
        
      }
    });
    gesture.enable(true)
  }

  toggleDrawer(){
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen)

    if (this.isOpen){
      drawer.style.transition = '.4s ease-out'
      drawer.style.transition = ``
      this.isOpen = false
    }else{
      drawer.style.transition = '.4s ease-in'
      drawer.style.transition = `translateY(${-this.openHeight}px)`
      this.isOpen = true
    }
  }

  hacerCambio(){
    let j1 = false
    let j2 = false

    j1 = this.titulares.includes(this.jugador1)
    j2 = this.titulares.includes(this.jugador2)

    this.titulares.indexOf(this.jugador1)
    if(j1 && j2){
      this.titulares[this.titulares.indexOf(this.jugador1)] = this.jugador2
      this.titulares[this.titulares.indexOf(this.jugador2)] = this.jugador1
    }else if(j1 && !j2){
      this.titulares[this.titulares.indexOf(this.jugador1)] = this.jugador2
      this.suplentes[this.suplentes.indexOf(this.jugador2)] = this.jugador1
    }else if(!j1 && j2){
      this.titulares[this.titulares.indexOf(this.jugador2)] = this.jugador1
      this.suplentes[this.suplentes.indexOf(this.jugador1)] = this.jugador2
    }else{
      this.suplentes[this.suplentes.indexOf(this.jugador1)] = this.jugador2
      this.suplentes[this.suplentes.indexOf(this.jugador2)] = this.jugador1
    }

    this.jugador2 = null
    this.jugador1 = null
  }

  aa(jugador: any){
    if(this.jugador1 == null){
      this.jugador1 = jugador
    }else{
      this.jugador2 = jugador
      this.hacerCambio()
    }
  }
}
