import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; 

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.5,40);

  @ViewChild('map') divMap?: ElementRef

  ngAfterViewInit(): void { 
    // console.log(this.divMap);
    // if (!this.divMap) throw 'El elemento html no fue encontrado';
    this.map = new Map({ 
      container: 'map', // container ID
      // container: 'map', // container ID
      // accessToken: 'pk.eyJ1IjoiamdhbWVzbCIsImEiOiJjazk5M24wNWExbzgwM2hxaGJ3Y3Y5cWphIn0.4XTROqGLALi0Ri2PFQLA7g',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
      this.map!.remove();
  }

  mapListeners() {
    if (!this.map ) throw 'Mapa no inicializado';
    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    })

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }
}
