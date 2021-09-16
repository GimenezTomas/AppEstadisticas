import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.page.html',
  styleUrls: ['./modal-editar.page.scss'],
})
export class ModalEditarPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss()
  }
}
