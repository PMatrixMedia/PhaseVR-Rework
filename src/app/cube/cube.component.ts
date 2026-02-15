import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cube',
  standalone: false,
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CubeComponent {}
