import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneComponent } from './pages/zone/zone.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'zones',
    pathMatch: 'full'
  },
  {
    path: 'zones',
    component: ZoneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ZonesRoutingModule { }
