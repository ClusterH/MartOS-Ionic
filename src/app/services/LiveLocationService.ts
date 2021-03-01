import { Injectable } from '@angular/core';
import { Point } from '../models/Point';
@Injectable({
    providedIn: 'root'
  })

export class LiveLocationService {
  token: string;
  currentLocation: Point;
  timer : number = 30;
  lastLocDate : number = 0;
  constructor() {

  }

  getLocation() {
    return new Promise<Point>((resolve) => {  
      if (this.lastLocDate == 0) {
        navigator.geolocation.getCurrentPosition(async (location) => {
          let date = new Date();
          this.lastLocDate = date.getTime() + (1000 * this.timer);
          this.currentLocation = <Point>{
            lat: location.coords.latitude,
            lng: location.coords.longitude
          };
          resolve(this.currentLocation);
          return this.currentLocation;
        }, (err) => {
        console.log(err);
      }, { maximumAge: 3000, timeout: 120000, enableHighAccuracy: true });
      } else {
        let currentDate = new Date().getTime();
        if (currentDate > this.lastLocDate) {
          navigator.geolocation.getCurrentPosition(async (location) => {

            let date = new Date()
            this.lastLocDate = date.getTime() + (1000 * this.timer);
            this.currentLocation = <Point>{
              lat: location.coords.latitude,
              lng: location.coords.longitude
            };
            resolve(this.currentLocation);
            return this.currentLocation;
          }, (err) => {
            console.log(err);
          }, { maximumAge: 3000, timeout: 120000, enableHighAccuracy: true });
        } else {
          resolve(this.currentLocation);
          return this.currentLocation;
        }
      }
  });
}
}