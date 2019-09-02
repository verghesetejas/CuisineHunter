import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestaurantService } from '../services/restaurant.service';
import { ZomatoSearch } from '../models/zomato-search.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  query: string;
  zomatoData: ZomatoSearch;
  restaurants: Array<any> = [];

  constructor( private restaurantService: RestaurantService, private router: Router ) { }

  ngOnInit() {
    this.query = '';
  }

  onSubmit(zomatoForm: NgForm, event: Event) {
    event.preventDefault();
    this.query = zomatoForm.value.query;
    this.restaurantService.getQuery(this.query).subscribe(response => {
      console.log(response);
      this.zomatoData = response;
      for (let i=0; i<response.restaurants.length; i++) {
        const element = {
          id: i+1,
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
  }
}
