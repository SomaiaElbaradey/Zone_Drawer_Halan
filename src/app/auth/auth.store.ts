import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { LoginVm, AuthServiceProxy } from '@core/service-proxies/service-proxies';

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})

export class AuthStore {

  private subject = new BehaviorSubject<any>(null!);

  user$: Observable<User> = this.subject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

  constructor(private _AuthServiceProxy: AuthServiceProxy,) {

    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);
    console.log("🚀 ~ file: auth.store.ts ~ line 28 ~ AuthStore ~ constructor ~ user", user)

    if (user) {
      this.subject.next(JSON.parse(user));
    }

    if (user) {
      this.subject.next(JSON.parse(user));
    }

  }

  login(body: LoginVm): Observable<any> {
    return this._AuthServiceProxy.login(body).pipe(
      tap((user: any) => {
        console.log("🚀 ~ file: auth.store.ts ~ line 51 ~ AuthStore ~ tap ~ user", user)
        localStorage.setItem("token", user?.token!)
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      }))
      .pipe(catchError(err => {
        return of(false);
      }))
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
    localStorage.removeItem("token");
  }
}
