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
    const staggerItems = el.querySelectorAll('.stagger-el');
    const navLinks = el.querySelectorAll('.nav-link');
    const words = el.querySelectorAll('.word');

    // Stagger elements over 2 seconds total
    if (staggerItems.length) {
      const itemCount = staggerItems.length;
      const duration = 0.5;
      const staggerDelay = (2 - duration) / Math.max(1, itemCount - 1);
      gsap.fromTo(staggerItems, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration,
        stagger: staggerDelay,
        ease: 'power2.out',
      });
    }

    // Nav icons slide in from right side of page to left
    if (navLinks.length) {
      gsap.fromTo(navLinks, { x: 400, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }

    // Words appear one at a time in random order
    if (words.length) {
      gsap.fromTo(words, { opacity: 0 }, {
        opacity: 1,
        duration: 0.35,
        stagger: { from: 'random', each: 0.05 },
        ease: 'power2.out',
      });
    }
  }

}
