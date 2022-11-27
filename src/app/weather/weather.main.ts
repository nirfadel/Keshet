import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, mergeMap } from 'rxjs';
import { WeatherService } from './services/weather.service';
import { City, latlon } from './weather.model';

@Component({
  selector: 'weather-main',
  templateUrl: './weather.main.html',
  styleUrls: ['./weather.main.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherMainComponent implements OnInit{

  constructor(private weatherService : WeatherService,
    private _router: Router) {
    
  }
  ngOnInit(): void {
   
  }
  cities: City[] = [];

  searchCities(searchInput: string)
  {
      this.getCities(searchInput);
  }

  getCities(searchInput: string){
    debugger;
    this.weatherService.getCitiesData(searchInput).subscribe(res=>{
    const searchResults = res._embedded['city:search-results'];
    this.convertToCities(searchResults);
    });
  }

  convertToCities(citySearchResults: any) {
    if(citySearchResults!=null)
    {
      this.cities = [];
      citySearchResults.forEach((element: any) => {
        const city: City = new City();
        city.CityName = element.matching_full_name;
        this.weatherService.getCityDetails(element._links["city:item"].href).pipe(
          map(cityDetails =>{
            const links: string[] = [];
            city.latlon = cityDetails.location.latlon;
            const urbanUrl =(cityDetails._links["city:urban_area"] != null) ? cityDetails._links["city:urban_area"].href : '';
            const timeZoneUrl = (cityDetails._links["city:timezone"]) ? cityDetails._links["city:timezone"].href : '';
            links.push(urbanUrl, timeZoneUrl);
            return links
             }),
            mergeMap( links => {
              
              const _urban = this.weatherService.getUrbanData(links[0]).pipe(
                map(urban =>{
                  const imgUrl = urban._links["ua:images"].href;
                  return imgUrl;
                }
                ), 
                mergeMap(imageUrl => { return this.weatherService.getUrbanImages(imageUrl).pipe(
                  map(images =>{
                    return images.photos[0].image.web;
                  })
                ) })
              )

              const _timeZone = this.weatherService.getCityDateTime(links[1]).pipe(
                map(times=>{
                  const timeZoneLink = times._links["tz:offsets-now"].href;
                  const params = new URL(timeZoneLink).searchParams;
                  return new Date(params.get('date')!);
                })

              )
              return forkJoin([_urban, _timeZone]);
           
            })).subscribe(result =>
              {
                city.ImageUrl = result[0];
                city.CurrentTime = result[1];
                this.cities.push(city);
              }
            );
           }
         )
      }
    } 

    showWeather(latLon: latlon){
    this._router.navigate(['view-weather', latLon.latitude, latLon.longitude ])
  }
}

