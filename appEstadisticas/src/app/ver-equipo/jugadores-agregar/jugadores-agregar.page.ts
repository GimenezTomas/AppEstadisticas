import { Component, OnInit } from '@angular/core';
import { AbmService } from '../../services/abm.service';
import firebase from 'firebase/app'
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';


@Component({
  selector: 'app-jugadores-agregar',
  templateUrl: './jugadores-agregar.page.html',
  styleUrls: ['./jugadores-agregar.page.scss'],
})
export class JugadoresAgregarPage implements OnInit {

  constructor(private ABMsvc:AbmService, private jugadoresService: JugadoresService,private AUTHsvc:AuthService) { }
  ngOnInit(): void {

  }

  agregarJugador(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion):void{
    this.jugadoresService.agregar('RIGtETEOcR9WyBN9MLL1', {
      nombre : nombre.value,
      apellido : apellido.value,
      nCamiseta : nCamiseta.value,
      nacimiento : nacimiento.value,
      peso : peso.value,
      altura : altura.value,
      posicion : posicion.value
    })
    /*usar el mail como en la otra funcion para autodetectar el usuario y subir automaticamente los 
      jugadores al club que corresponde (primer argumento de la funcion agregar) 
      revisar si hace falta el for each para agarrar el dato 
    */
  }
}


  