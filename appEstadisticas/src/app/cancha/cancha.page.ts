import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../services/firebase/equipo.service';
import { PartidosService } from '../services/firebase/partidos.service';

@Component({
  selector: 'app-cancha',
  templateUrl: './cancha.page.html',
  styleUrls: ['./cancha.page.scss'],
})
export class CanchaPage implements OnInit {
  backdropVisible = false


  constructor(private equipo:EquipoService, private partido: PartidosService) { }

  ngOnInit() {
  }

  sasa(){
    this.partido.getProximosPartidos("RIGtETEOcR9WyBN9MLL1", "Equipo1")
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible
  }
}
