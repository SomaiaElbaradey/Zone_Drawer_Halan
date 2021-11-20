import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        if (!this.isLogged()) {
            this.router.navigate(['/login'])
        }
        return this.isLogged();
    }

    isLogged() {
        return !!(localStorage.getItem("token"));
    }
}
