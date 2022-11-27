import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { latlon, Weather } from '../weather.model';
import { Location } from '@angular/common'

@Component({
  selector: 'weather-view',
  templateUrl: './weather.view.html',
  styleUrls: ['./weather.view.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherViewComponent implements OnInit{
  _latlan!: latlon;
  weather: Weather[] = [];
  private sub: any;
  constructor(private weatherService : WeatherService,
     private route: ActivatedRoute,
     private location: Location) {

  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this._latlan = new latlon();
       this._latlan.latitude = parseFloat(params['lat']);
       this._latlan.longitude = parseFloat(params['lon']);
       this.weatherService.getWeatherData(this._latlan).subscribe(res =>{
        const weatherList = res.list;
        this.buildWeatherPage(weatherList);
    }
    );
    });
  
  }

  buildWeatherPage(weatherData: any){
      for (let i = 0; i < weatherData.length; i++) {
          const data = weatherData[i];
          const w = new Weather();
          var dateFormat= new Date(data.dt_txt);
          w.Date = dateFormat;
          w.Temp = parseInt(data.main.temp);
          w.ImageUrl = this.getImageByWeather(data.weather[0].main)
          
          this.weather.push(w);
      }
   
  }

  getImageByWeather(weatherStatus: string)
  {
      //Rain, Snow/ 
      switch (weatherStatus) {
          case "Clouds":
                return "/assets/images/clouds.png"
                break;
          case "Rain":
                return "/assets/images/rain.png"
                break;
          case "Snow":
                return "/assets/images/snow.png"
                break;
          default:
                return "/assets/images/sun.png"
              break;
      }    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack()
  {
    this.location.back()
  }

}
