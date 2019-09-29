import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  user: Auth;
  username: string;
  password: string;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;

  constructor(private auth: AuthenticationService) { }

  /**
   * Initializes the login page
   */
  ngOnInit() {
    this.auth.getUserDetails().subscribe(data => {
      this.user = data ? data[0] : this.user;
    });
  }

  /**
   * Handles the on submit button clicked event
   * @param loginForm NgForm component data
   * @param event event data
   */
  onSubmit(loginForm: NgForm, event: Event): void {
    event.preventDefault();
    this.username = loginForm.value.username;
    this.password = loginForm.value.password;
    this.triggerLogin();
  }

  triggerLogin(): void {
    if (this.username === this.user.userName) {
      if (this.password === this.user.userPass) {
        console.log("Access Granted!");
        return;
      }
    }
    console.log("Access Denied!");
    return;
  }
}
