
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Renderer2, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild('footerComp', { static: false }) footer: ElementRef;
  @ViewChild('userDP', { static: false }) userDP: ElementRef;
  user: Auth;
  title = "Cuisine Hunter";
  sticky: number;

  constructor( private authService: AuthenticationService,
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }
  ngAfterViewInit(): void {
    this.sticky = this.footer.nativeElement.getBoundingClientRect().top;
  }

  ngOnChanges(): void {}

  /**
   * Handles window scroll animations
   */
  @HostListener('window:scroll', ['$event'])
  scroll(): void {
    if (this.renderer && this.footer.nativeElement) {
      if (window.pageYOffset > this.sticky) {
        this.renderer.addClass(this.footer.nativeElement, 'sticky');
      } else {
        this.renderer.removeClass(this.footer.nativeElement, 'sticky');
      }
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }
}


