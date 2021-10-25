import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { rejects } from 'assert';
import { resolve } from 'dns';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authSvc: AuthService) { 
    console.log("constructor de auth guard service")
  } 

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.authSvc.getClub().then(club => {
        if(club) { resolve(true); }
        else {
          this.authSvc.getEntrenador().then(entrenador => {
            if(entrenador) { resolve(true); }
            else {
              this.router.navigate(["eleccion-usuario"]);
              resolve(false);
            }
          });
        }
      });
    });
  }
}
