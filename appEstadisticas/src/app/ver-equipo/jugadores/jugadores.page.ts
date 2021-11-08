import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import 'firebase/firestore'
import { type } from 'os';
import { ModalBorrarJugadorPage } from 'src/app/modals/modal-borrar-jugador/modal-borrar-jugador.page';
import { ModalCrearJugadorComponent } from 'src/app/modals/modal-crear-jugador/modal-crear-jugador.component';
import { ModalEditarPage } from 'src/app/modals/modal-editar/modal-editar.page';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { EstadisticasService } from 'src/app/services/firebase/estadisticas.service';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {
  private jugadorList: any[];
  private idClub:string 

  constructor(private ABMsvc:AbmService,private modalController:ModalController, private jugadoresService: JugadoresService,private AUTHsvc:AuthService, private estadisticasService: EstadisticasService) {}
  async ngOnInit() {
    this.actualizarJugadores();
  }
  actualizarJugadores(){
    this.jugadorList = [];
    this.AUTHsvc.user$.subscribe(user => {
      this.idClub = user.uid;
      this.ABMsvc.afs.collection("clubes").doc(this.idClub).collection('jugadores').get().then((data)=>{
        data.forEach(element => {
          let jugador = element.data();
          jugador.id = element.id;
          this.jugadorList.push(jugador);
        });
      })
    })
  }

  borrar(idJugador:string) {
    this.jugadoresService.borrar(this.idClub, idJugador);
    this.actualizarJugadores();
  }
  async openModalEditar(jugador:object, idJugador:string){
    console.log("Abre modal :)")
    const modal = await this.modalController.create({
      component: ModalEditarPage,
      componentProps: {
        'idClub': this.idClub,
        'jugador': jugador,
        'idJugador' : idJugador
      }
    })
    modal.onDidDismiss().then((data)=>{
      this.actualizarJugadores();
    })
    return await modal.present()
  }
  async openModalAgregarJugador(){
    const modal = await this.modalController.create({
      component: ModalCrearJugadorComponent,
      componentProps: {
        'idClub' : this.idClub
      }
    })
    modal.onDidDismiss().then((data)=>{
     this.actualizarJugadores();
    })
    return await modal.present() 
  }
  async openModalEliminar(idJugador:string){
    const modal = await this.modalController.create({
      component: ModalBorrarJugadorPage
    })
    modal.onDidDismiss().then((data)=> {
      if(data.data.borra){
        this.borrar(idJugador);
      }
    })
    return await modal.present()
  }
}
