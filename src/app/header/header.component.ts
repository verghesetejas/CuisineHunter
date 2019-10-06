import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Renderer2, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Auth } from '../models/auth.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';

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

  constructor(
    private authService: AuthenticationService,
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer
    ) { }

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
  loginStatus(user: Auth): void {
    this.user = user;
    this.authService.setCurrentUser(user);
  }

  /**
   * Handles the logout button click event
   */
  logoutHandler(): void {
    this.user = null;
    this.authService.setCurrentUser(null);
  }

  /**
   * Returns safe user profile picture url.
   */
  userDPSanitizer(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(this.user.userDP);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
