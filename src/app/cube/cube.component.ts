import { AfterViewInit, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cube',
  standalone: false,
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CubeComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const root = this.elementRef.nativeElement.shadowRoot;
    if (!root) return;

    const cubewraps = root.querySelectorAll('.cubewrap');
    const wrap = root.querySelector('#wrap') as HTMLElement;

    if (cubewraps.length) {
      gsap.fromTo(cubewraps, { opacity: 0, scale: 0.8 }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(1.2)',
        onComplete: () => {
          if (wrap) {
            gsap.to(wrap, {
              rotationY: '+=360',
              rotationX: 45,
              duration: 8,
              repeat: -1,
              ease: 'none',
            });
          }
        },
      });
    }
  }

}
