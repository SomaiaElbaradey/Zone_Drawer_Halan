import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BootstarpModule } from './bootstarp/bootstarp.module';
import { RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrimengModule,
    BootstarpModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    NgxCaptchaModule,
    LoadingModule,
  ],
  exports: [
    PrimengModule,
    BootstarpModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxCaptchaModule,
    LoadingModule,
  ],
})
export class SharedModule {}
