import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherViewComponent } from './weather/weather-view/weather.view';
import { WeatherMainComponent } from './weather/weather.main';

const routes: Routes = [
  {
    path: 'view-weather/:lat/:lon',
    component: WeatherViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'view-weather',
    component: WeatherViewComponent
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',  component: WeatherMainComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
