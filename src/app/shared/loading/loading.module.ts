import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingDirective } from './loading.directive';
import { LoadingService } from './loading.service';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingDirective, LoadingSpinnerComponent],
  exports: [LoadingDirective, LoadingSpinnerComponent],
  providers: [
    LoadingService
  ]
})
export class LoadingModule { }
