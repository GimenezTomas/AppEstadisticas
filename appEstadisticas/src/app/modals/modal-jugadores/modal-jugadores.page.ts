import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquipoService } from 'src/app/services/firebase/equipo.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { PartidosService } from 'src/app/services/firebase/partidos.service';

@Component({
  selector: 'app-modal-jugadores',
  templateUrl: './modal-jugadores.page.html',
  styleUrls: ['./modal-jugadores.page.scss'],
})
export class ModalJugadoresPage implements OnInit {

  constructor(private modalController: ModalController, private partidosService: PartidosService, private equipoService: EquipoService) { }

  titular: boolean = false
  jugadoresTitulares: any = []
  jugadoresSuplentes: any = []
  cantJugadoresTitulares: number = 5
  cantJugadoresSuplentes: number = 5
  jugadores: any = [
    /*{
      id: 'dsdsds',
      nombre: 'Kevin Durant',
      nCamiseta: 7,
      posicion: 'Alero',
      img: 'https://teamsport.pe/wp-content/uploads/2020/06/Durant.jpg'
    },{
      id: 'dsdsds2',
      nombre: 'Stephen Curry',
      nCamiseta: 30,
      posicion: 'Base',
      img: 'https://imagenes.milenio.com/exTGQWQpuj4omAbbtEhEDv6vvaY=/958x596/smart/https://www.milenio.com/uploads/media/2021/05/16/stephen-curry-reuters-2_0_23_1024_637.JPG'
    },{
      id: 'dsdsds3',
      nombre: 'Lebron James',
      nCamiseta: 23,
      posicion: 'Alero',
      img: 'https://www.mundodeportivo.com/r/GODO/MD/p8/Baloncesto/Imagenes/2021/05/13/Recortada/img_cvila_20201106-185537_imagenes_md_otras_fuentes_no_archivables_lebron-kRKH-U493740258841Q4-980x554@MundoDeportivo-Web.jpg'
    },*/
  ]

  ngOnInit() {
    this.equipoService.getJugadoresEquipo('RIGtETEOcR9WyBN9MLL1' , 'Equipo1').then(doc => { this.jugadores = doc })
  }

  dismiss(){
    this.modalController.dismiss()
  }

  seleccionarJugador(idJugador: any){
    if(!this.jugadoresTitulares.includes(idJugador) && !this.jugadoresSuplentes.includes(idJugador) && this.jugadoresTitulares.length < this.cantJugadoresTitulares){
      if(this.titular){
        this.jugadoresTitulares.push(idJugador)
      }else{
        this.jugadoresSuplentes.push(idJugador)
      }
    }else if(this.titular){
      this.jugadoresTitulares = this.jugadoresTitulares.filter(obj => obj !== idJugador)
    }else{
      this.jugadoresSuplentes = this.jugadoresSuplentes.filter(obj => obj !== idJugador)
    }
  }

  clickTitular(){
    this.titular = !this.titular
  }
}
