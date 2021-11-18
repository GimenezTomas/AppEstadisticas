import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';
import { clubService } from 'src/app/services/firebase/club.service'
import { EquipoService } from 'src/app/services/firebase/equipo.service';
@Component({
  selector: 'app-crear-jugador-modal',
  templateUrl: './crear-jugador-modal.page.html',
  styleUrls: ['./crear-jugador-modal.page.scss'],
})
export class CrearJugadorModalPage implements OnInit {
  @Input() idClub:string;
  private equipos: any[] = [];
  equiposSelec = [];
  
  constructor(private toastcontroller:ToastController,private club:clubService,private equipoService:EquipoService, private ABMsvc:AbmService,private AUTHsvc: AuthService,private modalController:ModalController, private jugadoresService: JugadoresService) { }

  ngOnInit() {
    this.AUTHsvc.user$.subscribe(user =>{
      this.ABMsvc.afs.collection("clubes").doc(user.uid).collection("equipos").get().then(data => {
        data.forEach(element => {
          let equipo = element.data();
          equipo.id = element.id;
          console.log(equipo);
          this.equipos.push(equipo);
        });
      })
    })
  }

  async agregarJugador(nombre, apellido, nCamiseta, nacimiento , peso, altura, posicion):Promise<void>{
    if(nombre.value =="" || apellido.value==""){
      this.presentToast('Nombre y Apellido no pueden estar vacío');
    }else{ 
      let res = await this.jugadoresService.agregar(this.idClub, {
      nombre : nombre.value,
      apellido : apellido.value,
      nCamiseta : nCamiseta.value,
      nacimiento : nacimiento.value,
      peso : peso.value,
      altura : altura.value,
      posicion : posicion.value,
      equipos : this.equiposSelec
    })
    console.log(this.equiposSelec);
    if(this.equiposSelec != null){
      this.equiposSelec.forEach(equipo => {
        console.log(`el equipo es: ${equipo}`)
        this.equipoService.agregarJugadorEquipo(this.idClub,equipo,{'id':res.id,'nCamiseta':res.nCamiseta})
      });
    }
  
    this.dismiss()
    }
  }
  dismiss() {
   
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentToast(mensaje:string){
    const toast = await this.toastcontroller.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
  cambio(){
    console.log(this.equiposSelec)
  }
}
