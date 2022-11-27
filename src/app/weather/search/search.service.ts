import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
  } from '@angular/common/http';
import { latlon } from '../weather.model';

  @Injectable({
    providedIn: 'root',
  })

  export class SearchService{
    constructor(private http: HttpClient){

    }
  }