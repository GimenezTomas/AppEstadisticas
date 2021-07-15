import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { faAlgolia } from '@fortawesome/free-brands-svg-icons';
import * as firebase from 'firebase/app';
import { AbmService } from '../../services/abm.service';

@Component({
  selector: 'app-jugadores-agregar',
  templateUrl: './jugadores-agregar.page.html',
  styleUrls: ['./jugadores-agregar.page.scss'],
})
export class JugadoresAgregarPage implements OnInit {
  constructor(private ABMsvc:AbmService) {}

  ngOnInit() {

  }
  crearDeporte(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion):void{
    this.ABMsvc.afs.collection("jugadores").add({
      
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  }

}
