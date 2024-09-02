import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'; 

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef

  ngAfterViewInit(): void { 
    console.log(this.divMap);
    if (!this.divMap) throw 'El elemento html no fue encontrado';
    const map = new Map({ 
      container: this.divMap.nativeElement, // container ID
      // container: 'map', // container ID
      // accessToken: 'pk.eyJ1IjoiamdhbWVzbCIsImEiOiJjazk5M24wNWExbzgwM2hxaGJ3Y3Y5cWphIn0.4XTROqGLALi0Ri2PFQLA7g',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    
  }
}
