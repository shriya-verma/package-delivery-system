import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn();
  }
  IsLoggedIn = false;
  isUserLoggedIn(){
    let userToken = localStorage.getItem("userAccessToken") ? JSON.parse(localStorage.getItem("userAccessToken")!) : false;
    if(userToken){
      console.log("here in if")
      return true;
    }
    else {
      console.log("here in else")
      this.router.navigateByUrl("login");
      return false;
    }
  }
  getIsLoggedIn(): boolean{
    return this.IsLoggedIn;
  }
  
}
