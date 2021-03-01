import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';


@Injectable({
    providedIn: 'root'
  })
export class MapSkin {
   skin: any[] =[
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#49248F"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9021A1"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8751D6"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#B5A2DD"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#D0BCE1"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#A6E8BF"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#047C6E"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#7A45B0"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#990BC1"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#76D6B1"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#F3EBFF"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#DBD0EC"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#782FA2"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#CCAFE9"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#BA65E2"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#600F8F"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#F3EBFF"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#D9CDE9"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#7A588D"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#C9B4DF"
        }
      ]
    },
    {
      "featureType": "transit.station.airport",
      "elementType": "labels.icon",
      "stylers": [
        {
          "color": "#B857DB"
        }
      ]
    },
    {
      "featureType": "transit.station.airport",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#B13EDA"
        }
      ]
    },
    {
      "featureType": "transit.station.bus",
      "elementType": "labels.icon",
      "stylers": [
        {
          "color": "#7D27D3"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "labels.icon",
      "stylers": [
        {
          "color": "#7522C9"
        },
        {
          "weight": 1
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8B2FAC"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#A6E7E8"
        }
      ]
    }
  ];
}