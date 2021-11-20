import { AuthStore } from './../../../auth/auth.store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LogginAuthGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private auth: AuthStore
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.isLogged()) {
      this._router.navigate(['/home'])
      return false;
    }
    return true;
  }
  isLogged() {
    return !!(localStorage.getItem("token"));
  }
}
