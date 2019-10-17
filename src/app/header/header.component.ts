import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { Auth } from '../models/auth.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
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
    this.authService.getLoggedUserId().subscribe((userLog: Array<any>) => {
      if (userLog.length !== 0) {
        this.authService.getUserDetails(userLog[0].userId).subscribe((user: any) => {
          this.user = user[0];
        });
      }
    });
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

  /**
   * Sets user value
   * @param user - User value
   */
  loginStatus(user: Auth): void {
    this.user = user;
    this.authService.setCurrentUser(user);
    this.authService.getLoggedUserId().subscribe((userLog: Array<any>) => {
      if (userLog.length !== 0) {
        this.authService.getUserDetails(userLog[0].userId).subscribe((user: any) => {
          this.user = user[0];
        });
      }
    });
  }

  /**
   * Handles the logout button click event
   */
  logoutHandler(): void {
    this.user = null;
    this.authService.setCurrentUser(null);
    this.authService.logoutUser().subscribe((data: any) => {
      if (data) {
        console.log("User has been successfully logged-out!");
        return;
      }
      console.log("User Log-out failed!");
      return;
    });
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
