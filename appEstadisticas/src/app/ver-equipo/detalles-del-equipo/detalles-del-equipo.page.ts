import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalles-del-equipo',
  templateUrl: './detalles-del-equipo.page.html',
  styleUrls: ['./detalles-del-equipo.page.scss'],
})
export class DetallesDelEquipoPage implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }
}
