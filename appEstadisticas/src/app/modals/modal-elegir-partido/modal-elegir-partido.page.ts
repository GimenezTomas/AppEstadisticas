import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PartidosService } from 'src/app/services/firebase/partidos.service';

@Component({
  selector: 'app-modal-elegir-partido',
  templateUrl: './modal-elegir-partido.page.html',
  styleUrls: ['./modal-elegir-partido.page.scss'],
})
export class ModalElegirPartidoPage implements OnInit {

  partidos: any = []

  constructor(private partidosService: PartidosService, private modalController: ModalController) { }

  ngOnInit() {
    this.partidos = this.partidosService.getProximosPartidos('RIGtETEOcR9WyBN9MLL1', 'Equipo1')
  }

  dismiss(partido: any){
    this.modalController.dismiss({
      'dismissed': true, 'partido': partido
    })
  }
}
