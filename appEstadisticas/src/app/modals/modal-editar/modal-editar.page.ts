import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.page.html',
  styleUrls: ['./modal-editar.page.scss'],
})
export class ModalEditarPage implements OnInit {
  @Input() idClub:string;
  @Input() jugador:any;
  @Input() idJugador:string;
  @Input() jugadorN:object;
  private equiposSelec:Array<string>;
  private equipos = [];
  private equiposAux;
  
  
  constructor(private toastcontroller:ToastController, private ABMsvc:AbmService,private modalController: ModalController, private authSVC:AuthService,private jugadoresService: JugadoresService, private zone:NgZone) { }
  ngOnInit() {
    this.authSVC.user$.subscribe(user => {
      this.ABMsvc.afs.collection("clubes").doc(user.uid).collection("equipos").get().then(data => {
        data.forEach(element => {
          this.equipos.push(element.id);
        });
      })
    })
    this.equiposSelec = this.jugador.equipos;
    this.equiposAux = this.jugador.equipos;
    console.log('selec: ',this.equiposSelec,'aux: ',this.equiposAux);
  }

  async editar(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion){
    if(nombre.value=="" || apellido.value==""){
      this.presentToast();
    }else{
    await this.jugadoresService.editar(this.idClub,this.idJugador, {
      nombre : nombre.value,
      apellido : apellido.value,
      nCamiseta : nCamiseta.value,
      nacimiento : nacimiento.value,
      peso : peso.value,
      altura : altura.value,
      posicion : posicion.value
    })
    console.log("edita")
    this.dismiss();
  }
  }
  reloadPage(){
    this.zone.runOutsideAngular(() => {
      location.reload();
  });
  }
  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentToast(){
    const toast = await this.toastcontroller.create({
      message: 'Nombre y Apellido no pueden estar vacío',
      duration: 3000
    });
    toast.present();
  }
  cambio(){
  }
}
