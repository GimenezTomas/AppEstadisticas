import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../services/firebase/equipo.service';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.page.html',
  styleUrls: ['./crear-equipo.page.scss'],
})
export class CrearEquipoPage implements OnInit {

  constructor(private equipo: EquipoService) { }

  ngOnInit() {
  }

  aaa(){
    this.equipo.crearEquipo('njurv', 'sacd', 'RIGtETEOcR9WyBN9MLL1')
  }
}
