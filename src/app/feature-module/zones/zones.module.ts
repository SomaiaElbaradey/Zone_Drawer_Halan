
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonesRoutingModule } from './zones-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ZoneComponent } from './pages/zone/zone.component';
import { GmapComponent } from './components/gmap/gmap.component';


@NgModule({
  declarations: [
    ZoneComponent,
    GmapComponent
  ],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    SharedModule
  ]
})
export class ZonesModule { }
