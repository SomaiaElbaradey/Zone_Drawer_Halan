import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ApiServiceProxies from './service-proxies';
import * as ApiService from './zones-service-proxies';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ApiServiceProxies.AuthServiceProxy,
    ApiService.ZonesServiceProxies
  ]
})
export class ServiceProxiesModule { }
