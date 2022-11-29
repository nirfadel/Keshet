import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherViewComponent } from './weather/weather-view/weather.view';
import { WeatherMainComponent } from './weather/weather.main';

const routes: Routes = [
  { path: 'view-weather/:lat/:lon', component: WeatherViewComponent },
  { path: 'home', component:  WeatherMainComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
