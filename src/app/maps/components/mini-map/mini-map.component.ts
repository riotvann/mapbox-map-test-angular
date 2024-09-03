import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;



  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (!this.divMap?.nativeElement) throw "Map Div can't be null";
    if (!this.lngLat) throw "LngLat can't be null";

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      // container: 'map', // container ID
      // accessToken: 'pk.eyJ1IjoiamdhbWVzbCIsImEiOiJjazk5M24wNWExbzgwM2hxaGJ3Y3Y5cWphIn0.4XTROqGLALi0Ri2PFQLA7g',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat!, // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false
    });
    console.log('ici');
    console.log(this.lngLat);
    new Marker()
      .setLngLat(this.lngLat!)
      .addTo(map);
    console.log('ic2i');
  }
}
