import { Component, OnInit } from '@angular/core';
import { AbmService } from 'src/app/services/abm.service';
import { AuthService } from 'src/app/services/auth.service';
import { JugadoresService } from 'src/app/services/firebase/jugadores.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {

  constructor(private ABMsvc:AbmService, private jugadoresService: JugadoresService,private AUTHsvc:AuthService) { }
  ngOnInit(): void {throw new Error('Method not implemented.');}
  borrar():void {
    this.jugadoresService.borrar('RIGtETEOcR9WyBN9MLL1')
  }
}
