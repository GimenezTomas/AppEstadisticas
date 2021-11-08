import { Component, OnInit } from '@angular/core';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.page.html',
  styleUrls: ['./entrenador.page.scss'],
})
export class EntrenadorPage implements OnInit {

  constructor(private authSvc: AuthService, private afs: AbmService) { }

  ngOnInit() {
  }

  async registerEntrenador(name,apellido,fecha) {
    try {
      this.authSvc.user$.subscribe(data => {
        this.afs.afs.collection('entrenadores').doc(data.uid).set({
        nombre: name.value,
        apellido: apellido.value,
        fecha: fecha.value,
        email: data.email,
        club: null,
      }).then((docref)=> console.log('guardado'))
      .catch((error)=>console.error(error))
      })
    } 
    catch (error) {
      console.log('Error', error);
    }
  }

}
