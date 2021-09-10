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
  public jugadorList:any[] = [];

  constructor(private ABMsvc:AbmService, private jugadoresService: JugadoresService,private AUTHsvc:AuthService) {}
  ngOnInit(): void {
    this.jugadorList = [];

    this.AUTHsvc.user$.forEach(i=>
      this.ABMsvc.afs.collection("clubes").where("mail","==",i.email).get().then((data)=>{
        data.forEach(e => {
          e.data().jugadores.forEach(j=>
            this.jugadorList.push(j))
        })
    })) 
  }
  borrar(jugador:object):void {
    this.jugadoresService.borrar('RIGtETEOcR9WyBN9MLL1', jugador)
  }
}
