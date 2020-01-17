import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: '**', component: ErrorHandlerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
