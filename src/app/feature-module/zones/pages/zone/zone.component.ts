import { Component, OnInit } from '@angular/core';
import { ZonesServiceProxies, ZoneVm } from '@core/service-proxies/zones-service-proxies';
import { LoadingService } from '@shared/loading/loading.service';
import { MessageService } from 'primeng/api';
import { delay, retryWhen, tap } from 'rxjs/operators';
import { ZonesService } from '../../services/zones.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  zones!: any[];

  constructor(
    private _ZonesServiceProxies: ZonesServiceProxies,
    public loadingService: LoadingService,
    private _messageService: MessageService,
    private _ZonesService: ZonesService
  ) { }

  ngOnInit(): void {
    this.getZones();
  }

  addZone(event: any) {
    let data = new ZoneVm({
      color: event?.color,
      label: event?.label,
      points: event?.points
    })
    this._ZonesServiceProxies.postZone(data).pipe(
      retryWhen(
        errors =>
          errors.pipe(
            delay(1000),
            tap(errorStatus => {
              if (!errorStatus.startsWith('5')) {
                throw errorStatus;
              }
              console.log('Retrying...');
            })
          )
      )
    ).subscribe(
      res => {
        if (res.status == 200)
          this._messageService.add({ severity: 'success', summary: 'Add Zone Message', detail: "added successfully" });
        // if (typeof (JSON.parse(res)!.message) == 'string')
        //   this._messageService.add({ severity: 'info', summary: 'Add Zone Message', detail: JSON.parse(res)?.message });
        else
          this._messageService.add({ severity: 'error', summary: 'Error Message', detail: "Error" });
        this.getZones();
      },
      err => {
        this._messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      }
    )
  }

  getZones() {
    this.loadingService.startLoading(this);
    this._ZonesServiceProxies.getAll().pipe(
      retryWhen(
        errors =>
          errors.pipe(
            delay(1000),
            tap(errorStatus => {
              if (!errorStatus.startsWith('5')) {
                throw errorStatus;
              }
              console.log('Retrying...');
            })
          )
      )
    ).subscribe(
      res => {
        this.loadingService.endLoading(this);
        this.zones = res.data;
        this._ZonesService.reloadZones.next({ zones: this.zones });
      },
      err => {
        this.loadingService.endLoading(this);
      }
    )
  }

  deleteZone(event: any) {
    this._ZonesServiceProxies.delete(event.id).pipe(
      retryWhen(
        errors =>
          errors.pipe(
            delay(1000),
            tap(errorStatus => {
              if (!errorStatus.startsWith('5'))
                throw errorStatus;
            })
          )
      )
    ).subscribe(
      res => {
        this._messageService.add({ severity: 'success', summary: 'Delete Message', detail: 'Zone Deleted Successfully' });
        this.getZones();
      },
      err => console.log(err)
    )
  }


  
  updateZone(event: any) {
    let data = new ZoneVm({
      color: event?.color,
      label: event?.label,
      points: event?.points
    })
    this._ZonesServiceProxies.put(event.id, data).pipe(
      retryWhen(
        errors =>
          errors.pipe(
            delay(1000),
            tap(errorStatus => {
              if (!errorStatus.startsWith('5')) {
                throw errorStatus;
              }
              console.log('Retrying...');
            })
          )
      )
    ).subscribe(
      res => {        
        if (res.status == 200)
          this._messageService.add({ severity: 'success', summary: 'update Zone Message', detail: "update successfully" });
        if (typeof (res?.message) == 'string')
          this._messageService.add({ severity: 'info', summary: 'Update Zone Message', detail: res?.message });
        else
          this._messageService.add({ severity: 'error', summary: 'Error Message', detail: "Error" });
        this.getZones();
      },
      err => {
        this._messageService.add({ severity: 'error', summary: 'Error Message', detail: err.message });
      }
    )
  }

  getZone(event: any) {
    // this._ZonesServiceProxies.get(event.id).pipe(
    //   retryWhen(
    //     errors =>
    //       errors.pipe(
    //         delay(1000),
    //         tap(errorStatus => {
    //           if (!errorStatus.startsWith('5'))
    //             throw errorStatus;
    //         })
    //       )
    //   )
    // ).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => console.log(err)
    // )
  }
}
