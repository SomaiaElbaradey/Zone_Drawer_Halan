import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

import { LoadingModule } from '@shared/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    RouterModule,
    LoadingModule,
  ],
  providers: [],
  exports:[
    LoadingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
