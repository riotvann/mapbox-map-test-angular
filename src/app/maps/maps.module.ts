import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiamdhbWVzbCIsImEiOiJjazk5M24wNWExbzgwM2hxaGJ3Y3Y5cWphIn0.4XTROqGLALi0Ri2PFQLA7g';


import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
    MapsLayoutComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,

  ]
})
export class MapsModule { }
