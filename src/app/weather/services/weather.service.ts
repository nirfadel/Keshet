import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { latlon } from '../weather.model';

  @Injectable({
    providedIn: 'root',
  })

  export class WeatherService{
    private teleportUrl: string = "https://api.teleport.org/api"
    private citiesUrl: string = "/cities/?search=";
    constructor(private http: HttpClient){

    }
    getCitiesData(searchInput: string): Observable<any> {
        return this.http.get<any>(`${ this.teleportUrl + this.citiesUrl + searchInput}`);
    }

    getCityDetails(cityUrl: string): Observable<any>{
        return this.http.get<any>(`${ cityUrl }`);
    }

    getCityDateTime(cityTimeZoneUrl: string) :Observable<any>
    {
        return this.http.get<any>(`${cityTimeZoneUrl}`);
    }

    getUrbanData(urbanUrl: string): Observable<any>
    {
        return this.http.get<any>(`${urbanUrl}`);
    }

    getUrbanImages(imagesUrl: string) : Observable<any>
    {
        return this.http.get<any>(`${imagesUrl}`);
    }

    getWeatherData(latLon: latlon ): Observable<any>
    {
        let url =`https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.latitude}&lon=${latLon.longitude}&units=metric&appid=8f95ea039fdaa22fdc7d53dfada0e941`;
        return this.http.get<any>(`${ url }`);
    }
 
  }
