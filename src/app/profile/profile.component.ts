import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Auth;

  constructor(
    private authService: AuthenticationService,
    private domSanitizer: DomSanitizer
  ) { }

  /**
   * This method initializes the component
   */
  ngOnInit() {
    this.authService.getLoggedUserId().subscribe((userLog: any) => {
      if (userLog.length !== 0) {
        this.authService.getUserDetails(userLog[0].userId).subscribe((user: any) => {
          this.user = user[0];
        });
      }
    });
  }

  /**
   * Returns safe user profile picture url.
   */
  userDPSanitizer(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(this.user.userDP);
  }
}
