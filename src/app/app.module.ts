import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { WeatherMainComponent } from './weather/weather.main';
import { WeatherViewComponent } from './weather/weather-view/weather.view';
import { WeatherService } from './weather/services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './weather/search/search';

@NgModule({
  declarations: [
    AppComponent,
    WeatherMainComponent,
    WeatherViewComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
