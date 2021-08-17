import { Component, OnInit } from '@angular/core';
import { AbmService } from '../../services/abm.service';
import firebase from 'firebase/app'
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-jugadores-agregar',
  templateUrl: './jugadores-agregar.page.html',
  styleUrls: ['./jugadores-agregar.page.scss'],
})
export class JugadoresAgregarPage implements OnInit {

  constructor(private ABMsvc:AbmService, private AUTHsvc:AuthService) { }
  ngOnInit(): void {throw new Error('Method not implemented.');}

  agregarJugador(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion):void{
    this.ABMsvc.afs.collection("jugadores").add({
      Jugador : 
        {nombre : nombre.value,
        apellido : apellido.value,
        nCamiseta : nCamiseta.value,
        nacimiento : nacimiento.value,
        peso : peso.value,
        altura : altura.value,
        posicion : posicion.value}
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  }

}


  