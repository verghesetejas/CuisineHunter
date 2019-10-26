import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user: Auth;
  userHistoryList: Array<any> = [];
  showGrid = false;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.getLoggedUserId().subscribe((userLog: any) => {
      if (userLog.length !== 0) {
        this.authService.getUserDetails(userLog[0].userId).subscribe((user: any) => {
          this.user = user[0];
          this.authService.getUserHistory(user[0].userId).subscribe((data: any) => {
            this.userHistoryList = data;
            this.showGrid = true;
          });
        });
      }
    });
  }
}
