import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { gsap } from 'gsap';

@Component({
  selector: 'app-phasenav',
  standalone: false,
  templateUrl: './phasenav.component.html',
  styleUrls: ['./phasenav.component.css'],
})
export class PhasenavComponent implements AfterViewInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private elementRef: ElementRef<HTMLElement>,
  ) {}

  ngAfterViewInit(): void {
    const el = this.elementRef.nativeElement;
    const staggerItems = el.querySelectorAll('.stagger-el:not(.word-container)');
    const words = el.querySelectorAll('.word');

    if (staggerItems.length) {
      gsap.fromTo(staggerItems, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.3,
        ease: 'power2.out',
      });
    }

    if (words.length) {
      gsap.fromTo(words, { x: 200, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }
  }

}
