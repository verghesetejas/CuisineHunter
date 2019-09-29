import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('headerComp', { static: false }) header: ElementRef;
  title = "Cuisine Hunter";
  sticky: number;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngAfterViewInit(): void {
    this.sticky = this.header.nativeElement.getBoundingClientRect().top;
  }

  /**
   * Handles window scroll animations
   */
  @HostListener('window:scroll', ['$event'])
  scroll(): void {
    if (this.renderer && this.header.nativeElement) {
      if (window.pageYOffset > this.sticky) {
        this.renderer.addClass(this.header.nativeElement, 'sticky');
      } else {
        this.renderer.removeClass(this.header.nativeElement, 'sticky');
      }
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
