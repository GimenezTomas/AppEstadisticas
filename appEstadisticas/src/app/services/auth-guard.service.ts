import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authSvc: AuthService) { } 

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if(!this.authSvc.esClub && !this.authSvc.esEntrenador){
      this.router.navigate(["eleccion-usuario"])
      return false;
    }
    return true;
  }

}
