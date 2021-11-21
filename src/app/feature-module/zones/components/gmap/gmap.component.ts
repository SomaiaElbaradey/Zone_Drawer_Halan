import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZonesService } from '../../services/zones.service';
declare var google: any;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

  options: any;
  overlays: any[] = [];
  points: any[] = [];
  dialogVisible!: boolean;
  saveDialog!: boolean;
  deleteDialog!: boolean;
  operationDialog!:boolean;
  selectedPosition: any;
  infoWindow: any;
  draggable!: boolean;
  firstLang!: string;
  firstLat!: string;
  color!: any;
  label!: string;
  opsId!: string;

  @Output() onAddZone: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteZone: EventEmitter<any> = new EventEmitter();
  @Output() onUpdateZone: EventEmitter<any> = new EventEmitter();
  @Output() onGetZone: EventEmitter<any> = new EventEmitter();
  @Input() zones!: any[];

  constructor(
    private _ZonesService: ZonesService
  ) { }

  ngOnInit() {
    this.options = {
      center: { lat: 30.004041130819434, lng: 31.251200673337163 },
      zoom: 12
    };
    this.infoWindow = new google.maps.InfoWindow();
    this.load();
    this.drawZones();
  }

  load() {
    this._ZonesService.reloadZones.subscribe(
      res => {
        this.zones = res.zones;
        this.drawZones();
      }
    )
  }

  drawZones() {
    this.zones = this.zones.map(element => {
      return {
        id: element._id,
        color: element.color,
        points: element?.points.map((point: any) => {
          return { lat: Number(point.lat), lng: Number(point.lng) }
        }),
        label: element.label
      }
    });

    let zoneDraw: any[] = [];

    this.zones.forEach(element => {
      zoneDraw = [...zoneDraw,
      new google.maps.Polygon({ id: element.id, title: element.label, path: element.points, fillColor: element.color,
         strokeColor: '#0000', editable: true, points: element.points })
      ]
    });

    this.overlays = zoneDraw;
  }

  handleMapClick(event: any) {
    this.selectedPosition = event.latLng;
    this.dialogVisible = true;
  }

  handleOverlayClick(event: any) {
    this.points = [];
    this.selectedPosition = event.originalEvent.latLng;
    if (this.firstLang == this.selectedPosition.lng() && this.firstLat == this.selectedPosition.lat() && this.overlays.length > 0) {
      this.saveDialog = true;
    } else {
      this.operationDialog = true;
      this.opsId = event.overlay.id;      

      event.overlay.getPath().td.forEach((element: any) => {
        this.points = [
          ...this.points, {lat: element.lat(), lng:element.lng() }
        ]
      });
            
      this.onGetZone.emit({ id: this.opsId })
    }
  }

  addZone() {
    this.saveDialog = false;
    this.onAddZone.emit({ label: this.label, color: this.color, points: this.points })
    this.firstLang = '';
    this.firstLat = '';
    this.points = [];
  }

  addMarker() {
    if (this.points.length == 0) {
      this.firstLat = this.selectedPosition.lat();
      this.firstLang = this.selectedPosition.lng();
    }

    this.overlays = [...this.overlays,
    new google.maps.Marker({
      position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() },
      title: "", draggable: this.draggable
    })
    ]

    this.points = [
      ...this.points, { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }
    ]

    this.dialogVisible = false;
  }

  handleDragEnd(event: any) {    
  }

  deleteZone() {
    this.deleteDialog = false;
    this.onDeleteZone.emit({ id: this.opsId })
  }

  cancelDeletion() {
    this.deleteDialog = false;
  }

  mouseOver(e:any){
    console.log(e);
  }

  updateZone(){
    this.operationDialog = false;
    this.onUpdateZone.emit({ id: this.opsId, color: this.color, label: this.label, points: this.points })
  }

  cancelOperation(){
    this.operationDialog = false;
  }

  onDeleteDialog(){
    this.firstLang = '';
    this.firstLat = '';
    this.points = [];
    this.deleteDialog = true;      
    this.operationDialog = false;
  }

}