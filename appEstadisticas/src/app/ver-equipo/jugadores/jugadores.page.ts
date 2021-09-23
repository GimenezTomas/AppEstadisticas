import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import 'firebase/firestore'
import { ModalEditarPage } from 'src/app/modals/modal-editar/modal-editar.page';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {
  private jugadorList:any[] = [];
  private idClub:string 

  constructor(private ABMsvc:AbmService,private modalController:ModalController, private jugadoresService: JugadoresService,private AUTHsvc:AuthService) {}
  ngOnInit():void {
  
    this.actualizarJugadores()
    this.ABMsvc.afs.collection('club').doc('RIGtETEOcR9WyBN9MLL1').collection('jugadores').doc('d9LN16EYgi6MaAmPF0Zl').get().then((data)=> {
      console.log(data, data.nombre)
    });
    //console.log("antes")
    //const  jugador = this.jugadoresService.estadisticasJugador('RIGtETEOcR9WyBN9MLL1 ','d9LN16EYgi6MaAmPF0Zl')
    //console.log(jugador.data(),"entra console.log")
    //console.log("despues")
  }
  actualizarJugadores(){
    this.jugadorList = [];

    this.AUTHsvc.user$.forEach(i=>
      this.ABMsvc.afs.collection("clubes").where("mail","==",i.email).get().then((data)=>{
        data.forEach(e => {
          this.idClub = e.id
          //console.log(this.idClub)
          e.data().jugadores.forEach(j=>
            this.jugadorList.push(j))
        })
    })) 
  }
  borrar(jugador:object):void {
    this.jugadoresService.borrar(this.idClub, jugador)
    this.actualizarJugadores()
  }
  async openModalEditar(jugador:object){
    console.log("Abre modal :)")
    const modal = await this.modalController.create({
      component: ModalEditarPage,
      componentProps: {
        'id': this.idClub,
        'jugador': jugador
      }
    })
    return await modal.present()
  }

}
