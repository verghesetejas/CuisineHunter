import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

// declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModalClose', { static: true }) loginModalClose: ElementRef;
  @Output() loginStatus = new EventEmitter();
  user: Auth;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;

  constructor(private auth: AuthenticationService) { }

  /**
   * Initializes the login page
   */
  ngOnInit() {}

  /**
   * Handles the on submit button clicked event
   * @param loginForm NgForm component data
   * @param event event data
   */
  onSubmit(loginForm: NgForm, event: Event): void {
    event.preventDefault();
    this.triggerLogin(loginForm.value.username, loginForm.value.password);
  }

  triggerLogin(username: string, password: string): void {
    this.auth.getUserId(username, password).subscribe(userIdObj => {
      this.auth.getUserDetails(userIdObj[0].userId).subscribe(data => {
        this.user = data ? data[0] : this.user;
        if (username === this.user.userName) {
          if (password === this.user.userPass) {
            console.log("Access Granted!");
            this.loginModalClose.nativeElement.click();
            // jQuery(this.loginModal.nativeElement).modal('hide');
            if (this.user) {
              this.loginStatus.emit(this.user);
            } else {
              this.loginStatus.emit(null);
            }
            return;
          }
        }
        console.log("Access Denied!");
        return;
      });
    });
  }
}
