import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Renderer2, AfterViewInit, Input, OnChanges } from '@angular/core';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('headerComp', { static: false }) header: ElementRef;
  @ViewChild('userDP', { static: false }) userDP: ElementRef;
  user: Auth;
  title = "Cuisine Hunter";
  sticky: number;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngAfterViewInit(): void {
    this.sticky = this.header.nativeElement.getBoundingClientRect().top;
  }

  ngOnChanges(): void {}

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

  /**
   * Sets user value
   * @param user - User value
   */
  loginStatus(user: any): void {
    this.user = user;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
