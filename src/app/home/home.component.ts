import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RestaurantService } from '../services/restaurant.service';
import { ZomatoSearch } from '../models/zomato-search.model';
import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: Auth;
  query: string;
  zomatoData: ZomatoSearch;
  restaurants: Array<any>;
  showGrid: boolean;
  sticky: number;

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthenticationService
  ) { }

  /**
   * Initializes the home component
   */
  ngOnInit(): void {
    this.authService.getLoggedUserId().subscribe((userLog: any) => {
      if (userLog.length !== 0) {
        this.authService.getUserDetails(userLog[0].userId).subscribe((user: any) => {
          this.user = user[0];
        });
      }
    });
    this.query = '';
    this.restaurants = [];
    this.showGrid = false;
  }

  /**
   * Opens Links in a new browser tab
   * @param params string external link
   */
  navigateExternalLink(url: string): void {
    window.open(url);
    if (this.user) {
      let data = {
        searchQuery: this.query,
        linksClicked: url,
        userId: this.user.userId,
      };
      this.authService.postUserHistory(data).subscribe((res: any) => {
        console.log(res);
      });
    }
  }

  /**
   * Handles form submission event
   * @param zomatoForm submitted values
   * @param event event data
   */
  onSubmit(zomatoForm: NgForm, event: Event): void {
    event.preventDefault();
    this.query = zomatoForm.value.query;
    this.restaurantService.getQuery(this.query).subscribe(response => {
      this.zomatoData = response;
      this.restaurants = [];
      for (let i = 0; i < response.restaurants.length; i++) {
        const element = {
          id: i + 1,
          name: this.zomatoData.restaurants[i].restaurant.name,
          rating: this.zomatoData.restaurants[i].restaurant.user_rating.aggregate_rating,
          address: this.zomatoData.restaurants[i].restaurant.location.address,
          cuisines: this.zomatoData.restaurants[i].restaurant.cuisines,
          menu: this.zomatoData.restaurants[i].restaurant.menu_url,
          link: this.zomatoData.restaurants[i].restaurant.url,
        };
        this.restaurants.push(element);
      }
    });
    setTimeout(() => {
      this.showGrid = true;
    }, 1000);
  }
}
