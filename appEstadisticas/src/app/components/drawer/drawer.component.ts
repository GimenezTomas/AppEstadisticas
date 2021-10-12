import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, Input} from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_g } from '@angular/platform-browser';
import { GestureController, Platform } from '@ionic/angular';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { PartidosService } from 'src/app/services/firebase/partidos.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {
  @ViewChild('drawer', { read:ElementRef}) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();

  @Input()
    partido: any;
    
  isOpen = false;
  openHeight =  0;
  titulares: any = []
  suplentes: any = []

  constructor(private plt: Platform, private gestureCtrl: GestureController, private jugadoresService: JugadoresService) { }

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

  async getPlantilla(){    
    this.partido.jugadores.forEach(element => {
      console.log(element)
      let jugador = this.jugadoresService.jugadorPorId('RIGtETEOcR9WyBN9MLL1', element.id)
      if(element.titular){
        this.titulares.push(jugador)
      }else{
        this.suplentes.push(jugador)
      }
    });

    console.log(await this.suplentes[0])
  }

}
