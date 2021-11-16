import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import firebase from 'firebase/app';
import { PopComponent } from 'src/app/components/pop/pop.component';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-entrenador',
  templateUrl: './add-entrenador.page.html',
  styleUrls: ['./add-entrenador.page.scss'],
})
export class AddEntrenadorPage implements OnInit {

  constructor(public popoverController: PopoverController, private authSvc: AuthService, private afs: AbmService) { }

  entrenadores:any
  entrenador: any

  ngOnInit() {  
    
  }

  async presentPopover(ev: any) {
    this.entrenadores = await this.authSvc.getEntrenadores()
    const popover = await this.popoverController.create({
      component: PopComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true, 
      componentProps: {entrenadores: this.entrenadores}
    });
    await popover.present();

    popover.onDidDismiss().then((data)=>{
      this.entrenador = data.data.trainer
    })
  }

  agregarEntrendorClub(){
    try{
      this.authSvc.user$.subscribe( data => {
        this.afs.afs.collection('entrenadores').doc(this.entrenador.uid).update({
          club : data.uid
        }).then((docref)=> console.log('guardado'))
        .catch((error)=>console.error(error))
      })
      this.authSvc.user$.subscribe( data1 => {
        this.afs.afs.collection('clubes').doc(data1.uid).update({
          entrenadores: firebase.firestore.FieldValue.arrayUnion(this.entrenador.uid)
        })
      })

    }
    catch (error) {
      console.log('Error', error);
    }
  }
}
