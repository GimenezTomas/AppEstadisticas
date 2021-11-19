import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-jugadores-inicio',
  templateUrl: './jugadores-inicio.page.html',
  styleUrls: ['./jugadores-inicio.page.scss'],
})
export class JugadoresInicioPage implements OnInit {

  constructor(public authSvc: AuthService) { }

  ngOnInit() {
  }

}
