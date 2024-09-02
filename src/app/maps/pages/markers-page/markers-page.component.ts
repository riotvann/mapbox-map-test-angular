import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndcolor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.5,40);

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndcolor[] = [];

  ngAfterViewInit(): void { 
    // console.log(this.divMap);
    // if (!this.divMap) throw 'El elemento html no fue encontrado';
    this.map = new Map({ 
      container: 'map', // container ID
      // container: 'map', // container ID
      // accessToken: 'pk.eyJ1IjoiamdhbWVzbCIsImEiOiJjazk5M24wNWExbzgwM2hxaGJ3Y3Y5cWphIn0.4XTROqGLALi0Ri2PFQLA7g',
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
    }); 

    this.readFromLocalStorage();
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Wea Fome';

    // const marker = new Marker({ element: markerHtml}).setLngLat( this.lngLat ).addTo(this.map);
  }

  createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker( lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lngLat)
      .addTo(this.map);

      this.markers.push({
        color,
        marker
      });
      this.saveToLocalStorage();

      marker.on('dragend', () => {
        this.saveToLocalStorage()
      });
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo ( marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  } 

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map (({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach( ({color, lngLat}) => {
      const coords = new LngLat(lngLat[0], lngLat[1]);
      this.addMarker(coords, color);
    })
  }

}
