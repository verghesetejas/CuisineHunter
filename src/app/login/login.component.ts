import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModalClose', { static: false }) loginModalClose: ElementRef;
  @ViewChild('signupModalClose', { static: false }) signupModalClose: ElementRef;
  @Output() loginStatus = new EventEmitter();
  user: Auth;
  hasMembership = true;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;

  constructor(private authService: AuthenticationService) { }

  /**
   * Initializes the login page
   */
  ngOnInit() {}

  /**
   * Toggler for hasMembership variable
   */
  toggleMembershipStatus(): void {
    this.hasMembership = !this.hasMembership;
  }

  /**
   * Opens Links in a new browser tab
   * @param params string external link
   */
  navigateExternalLink(url: string): void {
    window.open(url);
  }

  /**
   * Handles the on submit button clicked event
   * @param loginForm NgForm component data
   * @param event event data
   */
  onSubmit(loginForm: NgForm, event: Event): void {
    event.preventDefault();
    this.triggerLogin(loginForm.value.username, loginForm.value.password);
  }

  /**
   * Handles the on submit button clicked event for Signup form
   * @param loginForm NgForm component data
   * @param event event data
   */
  onSubmitSignup(signupForm: NgForm, event: Event): void {
    event.preventDefault();
    this.authService.getUserCount().subscribe((data: any) => {
      this.triggerSignup(signupForm, data[0].userCount);
    })
  }

  /**
   * Handles Log-in
   * @param username 
   * @param password 
   */
  triggerLogin(username: string, password: string): void {
    this.authService.getUserId(username, password).subscribe(userIdObj => {
      this.authService.getUserDetails(userIdObj[0].userId).subscribe(data => {
        this.user = data ? data[0] : this.user;
        if (username === this.user.userName) {
          if (password === this.user.userPass) {
            console.log("Access Granted!");
            const logUser = {
              userId: this.user.userId,
            };
            this.authService.postLoggedUser(logUser).subscribe((data: any) => {
              if (data) {
                console.log("User has been logged-in! - " + data);
                this.loginModalClose.nativeElement.click();
                this.loginStatus.emit(this.user);
                return;
              }
              console.log("Error: Something went wrong");
              return;
            });
          }
        }
        console.log("Access Denied!");
        this.loginStatus.emit(null);
        return;
      });
    });
  }

  /**
   * Handles Sign-up
   * @param formData - signupForm data
   */
  triggerSignup(formData: NgForm, userId: number): void {
    const params = {
      userId: userId + 1,
      userName: formData.value.userName,
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      userPass: formData.value.userPass,
      userEmail: formData.value.userEmail,
      userDP: "",
      joinDate: moment().format("YYYY-MM-DD"),
    };
    this.authService.postUser(params).subscribe((data: any) => {
      if (data) {
        console.log("User has been added! - " + data);
        this.signupModalClose.nativeElement.click();
        return;
      }
      console.log("Error: Something went wrong");
      return;
    });
  }
}
