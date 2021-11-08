import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { rejects } from 'assert';
import { resolve } from 'dns';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authSvc: AuthService) { } 

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.authSvc.getClub().then(club => {
        if(club) { resolve(true); }
        else {
          this.authSvc.getEntrenador().then(entrenador => {
            if(entrenador) { 
              this.authSvc.entrenadorClub().then(entr => {
                if(entr){ resolve (true); }
                else{ 
                  this.router.navigate(["loading"]);
                  resolve(false);
                }
              });
            }
            else {
              this.router.navigate(["eleccion-usuario"]);
              console.log(club)
              resolve(false);
            }
          });
        }
      });
    });
  }
}
