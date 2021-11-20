import { Injectable, Injector } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfigService } from '../app-confiq/app-config.service';

@Injectable()
export class BaseService {
  public readonly baseUrl!: string;
  public readonly Version!: string;
  static url: string;

  private subjectUrl = new BehaviorSubject<any>(null);
  subjectUrl$: Observable<any> = this.subjectUrl.asObservable();
  constructor(
    private injector: Injector,) {
    debugger;
    const _AppConfigService = this.injector.get(AppConfigService);
    this.baseUrl = _AppConfigService.config.servicesBasePath + '/api/' + _AppConfigService.config.Version + '/';

    this.subjectUrl.next(_AppConfigService.config.servicesBasePath)
  }

  loadurl() {
    this.subjectUrl$.subscribe(
      (res) => {
        console.log("🚀 ~ file: app.component.ts ~ line 16 ~ AppComponent ~ constructor ~ res", res)
        BaseService.url = res
      }
    )
  }

}

