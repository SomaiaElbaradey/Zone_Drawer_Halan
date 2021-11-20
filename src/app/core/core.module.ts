import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/interceptor/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService } from './_services/app-confiq/app-config.service';
//TranslateModule
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ServiceProxiesModule } from './service-proxies/service-proxies.module';
import { API_BASE_URL } from './service-proxies/service-proxies';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';


import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

const appInitializer = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json')
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FullLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BsDropdownModule.forRoot(),
    RouterModule,
    ServiceProxiesModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    FullLayoutComponent,
    ContentLayoutComponent,
    ServiceProxiesModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AppConfigService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService
  ]
})

export class CoreModule {
}


