import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap, map } from 'rxjs/operators';
@Injectable()
export class AppConfigService {
  private appConfig:any;

   baseUrl!:string;

  constructor (private injector: Injector) { }

  loadAppConfig() {
      let http = this.injector.get(HttpClient);
      return http.get('/assets/config.json')
      .toPromise()
      .then(data => {
          this.appConfig = data;
          this.baseUrl = this.appConfig.servicesBasePath
          console.log("🚀 ~ file: app-config.service.ts ~ line 19 ~ AppConfigService ~ loadAppConfig ~ AppConfigService.baseUrl ", this.baseUrl )
      })
  }

  get config() {
      if(this.appConfig == undefined){
          this.loadAppConfig();
      }
      return this.appConfig;
  }


  public getToken(): string {
    let userToken;
    userToken = localStorage.getItem('token');
    if (userToken) {
      return userToken;
    }
    return "";
  }
}
