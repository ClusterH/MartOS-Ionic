import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import {
  ToastController,
  Platform
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  HtmlInfoWindow,
  GoogleMapsAnimation,
  MyLocation,
  MarkerOptions,
  Environment,
  LatLng,
  MarkerIcon,
  Polyline,
  Poly
} from '@ionic-native/google-maps';
import { GetByLocationRequest } from '../../requests/GetByLocationRequest';
import { UserCoordinates } from '../../models/UserCoordinates';
import { StoreItem } from '../../models/StoreItem';
import { NavController } from '@ionic/angular';
import { MapsService } from '../../services/MapsService';
import { ArticleService } from '../../services/ArticleService';
import { Router } from '@angular/router';
import { StoresService } from '../../services/StoresService';
import { GetByStoreRequest } from '../../requests/GetByStoreRequest';
import { OnlineProductClient } from '../../clients/OnlineProductClient';
import { MapSkin } from '../../services/MapSkin';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Subscription } from 'rxjs';
import { OnlineArticle } from '../../models/OnlineArticle';
import { DirectionsClient } from '../../clients/DirectionsClient';
import { Location } from '../../models/Location';
import { GetRouteRequest } from '../../requests/GetRouteRequest';
import { StoreItemId } from '../../requests/StoreItemId';
import { GetStoreItemIdsRequest } from '../../requests/GetStoreItemIdsRequest';
import { ShoppingList } from '../../shopping-list/models/shopping-list.model';
import { SlideMapStore } from '../../models/SlideMapStore';
import { Point } from '../../models/Point';
import * as THREE from 'three';
import {SphericalUtil, PolyUtil} from "node-geometry-library";

@Component({
  selector: 'app-mapView',
  templateUrl: 'mapView.page.html',
  styleUrls: ['mapView.page.scss']
})

export class MapViewPage implements OnInit, OnDestroy {
  map: GoogleMap;
  address: string;
  searchName: string = "";
  markersOptions: MarkerOptions[] = [];
  myLocation: MyLocation;
  request: GetByLocationRequest;  
  storeItem: StoreItem[];
  // htmlInfoWindow: HtmlInfoWindow;
  storeRequest: GetByStoreRequest;
  activeMarker: any;
  marker: Marker;
  markers: Marker[] = [];
  markersToDelete: Marker[] = [];
  latLng: LatLng;
  gmarkers = [] = [];
  maps: GoogleMap;
  searchSubscription: Subscription;
  goProductSubscription: Subscription;
  goPopUpProductSubscription: Subscription;
  goListSubscription: Subscription;
  stopDirectionsSubscription: Subscription;
  locationToGo: Location[] = [];
  directionsPath : Polyline;
  points: Point[];
  @Input() storeItems: StoreItem[] = [];

  @Output() markerClicked = new EventEmitter();

  private readonly router: Router;
  private readonly articleService: ArticleService;
  private readonly onlineProductClient: OnlineProductClient;
  private readonly mapsService: MapsService;
  private readonly storeService: StoresService;
  private readonly mapSkin: MapSkin;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private platform: Platform,
    private directionsClient: DirectionsClient,
    mapsService: MapsService,
    onlineProductClient: OnlineProductClient,
    articleService: ArticleService,
    storeService: StoresService,
    private backgroundGeolocation: BackgroundGeolocation,
    router: Router,
    mapSkin: MapSkin) {
    this.onlineProductClient = onlineProductClient;
    this.mapsService = mapsService;
    this.articleService = articleService;
    this.router = router;
    this.storeService = storeService;
    this.mapSkin = mapSkin;
  }

  ngOnInit() {
    this.goListSubscription = this.mapsService.currentGoListLocation.subscribe(data => {
      if (!data) {
        return;
      }
      
      this.addMarkerToListLocation(data.shoppingListLoc , data.location, data.differentPage);
    });

    this.goPopUpProductSubscription = this.mapsService.currentGoPopProduct.subscribe(data => {
      if (!data) {
        return;
      }
      
      this.addMarkerPopupLocation(data.product, data.differentPage);
    });

    this.stopDirectionsSubscription = this.mapsService.currentDeleteDirection.subscribe(data => {
      if (!data) {
        return;
      }
      
      this.mapsService.stopDirection();
      this.directionsPath.remove();
      this.removeMarkers();
    });
    
    this.searchSubscription = this.mapsService.currentSearch.subscribe(search => {
      if (!search) {
        return;
      }

      if (this.directionsPath != null || this.directionsPath != undefined) {
        this.mapsService.changeDeleteDirections("del") 
      }
      this.search(search);
    });
    
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 1,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      fastestInterval: 4000,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config)
    .then(() => {
  
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.latLng = <LatLng>{
          lat: location.latitude,
          lng: location.longitude
        };
        this.createLocationMarker(this.latLng);
      });  
    });
  
  // start recording location
  this.backgroundGeolocation.start();
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.

     this.platform.ready().then(()=>{
     if (document.URL.startsWith('http')){
     Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBn36lftauMnC5QivKGrfy3hosd-p2RrKw",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBn36lftauMnC5QivKGrfy3hosd-p2RrKw"
     });
     }
      this.loadMap();
     });

     navigator.geolocation.watchPosition((location) => {
     this.latLng = <LatLng>{
       lat: location.coords.latitude,
       lng: location.coords.longitude
     };

       this.createLocationMarker(this.latLng);
     }, (err) => {
       console.log(err);
     }, { enableHighAccuracy: true });

  }

  async addMarkerToListLocation(shoppingList: ShoppingList ,locations: Location[],secondaryPage?:false){    
    if (locations == null || locations == undefined) {
      return;
    }

    this.locationToGo = [];
    this.removeMarkers();
    if (this.directionsPath != null && this.directionsPath != undefined) {
      this.directionsPath.remove();      
    }

    return new Promise(async (resolve) => {
      if(secondaryPage){
        this.loadMap();
        this.map.clear();
      }
      
    await this.map.getMyLocation().then(async (location: MyLocation) => {
      if (!location) {
        return;
      }
      
      resolve(location);
      this.latLng = <LatLng>{
        lat: location.latLng.lat,
        lng: location.latLng.lng
      };

      if (secondaryPage) {
        this.createLocationMarker(this.latLng);
        //this.marker = null;
        //this.createLocationMarker(this.latLng);
      }
      
      let coordinates : number[] = [];
      coordinates.push(location.latLng.lng);
      coordinates.push(location.latLng.lat);
      let userLoc = <Location>{
        coordinates : coordinates
      };

      this.locationToGo.push(userLoc);
      locations.forEach(location =>{
        this.locationToGo.push(location);
         });

      let request = <GetRouteRequest>{
        locations : this.locationToGo
      };

      let storeItemIds : StoreItemId[] = [];        
      shoppingList.onlineArticles.forEach(article => {
        let storeitemId = <StoreItemId>{
          itemId: article.itemId,
          RefStoreId: article.refStoreId
        };

        storeItemIds.push(storeitemId);
      });
      
      let storeRequest = <GetStoreItemIdsRequest>{
        country : "France",
        StoreItemIds : storeItemIds
      };
        
        (await this.onlineProductClient.GetMapProduct(storeRequest)).subscribe(async stores => {
          resolve(stores);
          let slideMapStore = <SlideMapStore>{
            name: shoppingList.name + "List",
            storeItems: stores
          };

          this.mapsService.changeStoreItems(slideMapStore);
            (await this.directionsClient.GetListRouteDirection(request)).subscribe(async listDirection => {
              stores.forEach(async store => {
                await this.addMarkers(store);
              });
              
              this.points = listDirection.points;

               let id = 1; 
               this.points.forEach(point => {
                 point.id = id;
                 id = id + 1;
               });

              this.directionsPath = this.map.addPolylineSync({
                points: listDirection.points,
                'color' : '#AA00FF',
                'width': 5,
                'geodesic': true
            });

            }); 
        });  
      });
    });
  }

  correctPolylinePath(latLng :LatLng) {
    //this.map.pol isLocationOnEdge(latlng, polyline
     let pointNumberToDelete: number = 0;
    console.log(this.points);
    for (let index = 0; index < this.points.length; index++) {
      //alert(1)
      let firstPoint = <LatLng>{
        lat : this.points[index].lat,
        lng : this.points[index].lng,
      };
      //alert(2)
      let secondPoint = <LatLng>{
        lat : this.points[index + 1].lat,
        lng : this.points[index + 1].lng,
      };
      //alert(3)
      let foints : LatLng[] = [firstPoint, secondPoint]
      let response =  PolyUtil.isLocationOnEdge(latLng,foints, );

       if (response == true) {
           if (pointNumberToDelete == 0) {
             pointNumberToDelete = pointNumberToDelete + 1;
           } 

           for (let index = 0; index < pointNumberToDelete; index++) {
             var idToDelete = this.points[index].id; 
             this.points = this.points.filter(x => x.id != idToDelete);
             this.directionsPath.getPoints().removeAt(index);
           }
           pointNumberToDelete = 0;
           break;
       } else {
         pointNumberToDelete = pointNumberToDelete + 1;
       }
    }
  }

  isPointbetweenTwoOthers (pA, pB, pToCheck) {
    var nvAtoB = new THREE.Vector2();
    nvAtoB.subVectors(pB, pA).normalize();

    var nvAtoC = new THREE.Vector2();
    nvAtoC.subVectors(pToCheck, pA).normalize();

    var nvBtoC = new THREE.Vector2();
    nvBtoC.subVectors(pToCheck, pB).normalize();

    let epsilon = 0.0016;
    let cos90epsi = 1.0 - epsilon;
    return nvAtoB.dot(nvAtoC) > cos90epsi && nvAtoB.dot(nvBtoC) < -cos90epsi;
}

  async addMarkerPopupLocation(productToGo: OnlineArticle, differentPage: boolean){
    if (differentPage == undefined) {
      return;
    }

    this.locationToGo = [];
    this.removeMarkers();
    if (this.directionsPath != null && this.directionsPath != undefined) {
      this.directionsPath.remove();      
    }
    
   return new Promise(async (resolve) => {
     if (differentPage) {
        this.loadMap();
        this.map.clear();
     }

   await this.map.getMyLocation().then(async (myLocation: MyLocation) => {
      if (!myLocation) {
      return;
    }

    resolve(myLocation);
    if (differentPage) {
      this.marker = null;
      this.createLocationMarker(this.latLng);
    }
    
    let coordinates : number[] = [];
    coordinates.push(myLocation.latLng.lng);
    coordinates.push(myLocation.latLng.lat);
      
    let location = <Location>{
      coordinates : coordinates
      }

    this.locationToGo.push(location);
    this.locationToGo.push(productToGo.location);

    let request = <GetRouteRequest>{
        locations : this.locationToGo
    };

    let store : StoreItem[] = [];
    if (differentPage) {
       let storeitemId = <StoreItemId>{
         itemId: productToGo.itemId,
         RefStoreId: productToGo.refStoreId
       };

       let storeItemIds : StoreItemId[] = [];
       storeItemIds.push(storeitemId);
       let storeRequest = <GetStoreItemIdsRequest>{
         country : "France",
         StoreItemIds : storeItemIds
       };

      (await this.onlineProductClient.GetMapProduct(storeRequest)).subscribe(async val => {
        resolve(val);

        let slideMapStore = <SlideMapStore>{
          name: "Selected Store To Go",
          storeItems: val
        };

        this.mapsService.changeStoreItems(slideMapStore);
        await this.addMarkers(val[0]);
        (await this.directionsClient.GetProductDirection(request)).subscribe(points => {
          this.points = points; 
        this.directionsPath = this.map.addPolylineSync({
            points: points,
          'color' : '#AA00FF',
          'width': 10,
          'geodesic': true
          });
        });
      });
    } else {
        store = this.storeItems.filter(x => x.storeId == productToGo.refStoreId);
        let slideMapStore = <SlideMapStore>{
          name: "Selected Store To Go",
          storeItems: store
        };

        this.mapsService.changeStoreItems(slideMapStore);
        await this.addMarkers(store[0]);
        (await this.directionsClient.GetProductDirection(request)).subscribe(points => {
        resolve(points);
        this.points = points; 
        this.directionsPath = this.map.addPolylineSync({
            points: points,
           'color' : '#AA00FF',
           'width': 10,
           'geodesic': true
          });
          });
      }
    });
  });
  }

  ngOnDestroy() {
    this.backgroundGeolocation.stop();
    //ios plateform
    this.backgroundGeolocation.finish();
    if(this.searchSubscription){
      this.searchSubscription.unsubscribe();
    }

    if(this.goPopUpProductSubscription){
      this.goPopUpProductSubscription.unsubscribe();
    }

    if(this.goProductSubscription){
      this.goProductSubscription.unsubscribe();
    }

    if(this.goListSubscription){
      this.goListSubscription.unsubscribe();
    }

    if(this.stopDirectionsSubscription){
      this.stopDirectionsSubscription.unsubscribe();
    }
    
    this.mapsService.changeDeleteDirections(null);
    this.mapsService.changePopUpGoProducts(null, null);
    this.mapsService.changeGoListLocation(null, null);
  }

  async search(search : string){
    this.removeMarkers();
    let userCoordinates = <UserCoordinates>
    {    
      longitude: this.latLng.lng,
      latitude: this.latLng.lat,
      country: "France"
    };
    
    this.request = <GetByLocationRequest>
    {
      search: search,
      userCoordinates: userCoordinates,
      country: "France"
    };
    
    return new Promise(async (resolve) => {
    (await this.onlineProductClient.GetProductsMap(this.request)).subscribe(val => {
      resolve(val);
      this.storeItem = val;
      let slideMapStore = <SlideMapStore>{
        name: "All stores Selling",
        storeItems: this.storeItem
      };

      this.mapsService.changeStoreItems(slideMapStore);
      val.forEach(element => {
        this.addMarkers(element)        
      });
      });
     });
  }

  removeMarkers(){
    if (this.gmarkers != []) {
      this.gmarkers.forEach(marker => {
        marker.setVisible(false);
    }); 
    this.gmarkers = [];
    }
  }

  loadMap() {
    if (this.map == undefined || this.map == null) {
    this.map = GoogleMaps.create('map_canvas', {

      camera: {
        zoom: 18,
        tilt: 30
      }, 
      styles: this.mapSkin.skin
    });
    this.map;
    }
  }

  createLocationMarker(latLng :LatLng) {
     if (this.marker != null || this.marker != undefined) {
      this.marker.setPosition({
         lat: latLng.lat,
         lng: latLng.lng
       });
     } else {
      this.map.animateCamera({
        target: this.latLng,
        zoom: 15,
        tilt: 30,
        duration: 1
      });

         this.marker = this.map.addMarkerSync({        
            position: latLng,
            icon: {
              url: 'https://fafounet.blob.core.windows.net/userimages/live_location.png',
              size: { 
                width: 30,
                height: 30,
                flat: true
              }
            },
            animation: GoogleMapsAnimation.BOUNCE
          });
     }

     if (this.directionsPath != null || this.directionsPath != undefined) {
       this.correctPolylinePath(latLng);
     }
  }

  async addDirectionMarkers(location: Location) {
    
    let marker = this.map.addMarker({        
      position: {
        lat: location.coordinates[1],
        lng: location.coordinates[0],
      },
      icon: {
        url: 'https://fafounet.blob.core.windows.net/userimages/blue.png',
        size: { 
          width: 28,
          height: 36,
          flat: false
        }
      },
    });   
  }

  async addMarkers(storeItem: StoreItem) {
    
    let marker = this.map.addMarker({        
      position: {
        lat: storeItem.latitude,
        lng: storeItem.longitude,
      },
      icon: {
        url: 'https://fafounet.blob.core.windows.net/userimages/blue.png',
        size: { 
          width: 28,
          height: 36,
          flat: false
        }
      },
      animation: GoogleMapsAnimation.BOUNCE
    })
    .then((marker: Marker) => {
          this.gmarkers.push(marker);
           marker.set("params", storeItem)
           marker.on(GoogleMapsEvent.MARKER_CLICK)
             .subscribe((e) => {
               if(this.activeMarker){
                 this.activeMarker.setIcon({
                     url: 'https://fafounet.blob.core.windows.net/userimages/blue.png',
                     size: {
                       width: 28,
                       height: 36,
                     }
                 })
               }
               this.markerClicked.emit({ ...marker, item: storeItem });
               marker.setIcon({
                   url: 'https://fafounet.blob.core.windows.net/userimages/red.png',
                   size: {
                     width: 44,
                     height: 48,
                   }
               })
              
               this.activeMarker = marker;
             });
         });   
  }

  onMarkerClick(marker: Marker) {

    var store: StoreItem;
    var myHtml = document.createElement("div");
    store = marker.get("params");
    myHtml.innerHTML = "<br>fafafa</br><button class='button'>see results</button><button class='button'>access store</button>";
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = "";
    var button = myHtml.getElementsByTagName("button")[0];
    var secbutton = myHtml.getElementsByTagName("button")[1];
    this.articleService.changeArticleData(store.onlineProduct);
    this.storeRequest = <GetByStoreRequest>
      {
        country: "France",
        storeId: store.storeId
      }

    button.addEventListener('click', () => {
      this.redirectToArticlesResults();
    });

    secbutton.addEventListener('click', () => {
      this.accessStore();
    });

    // this.htmlInfoWindow.setContent(myHtml);
    // this.htmlInfoWindow.open(marker);
  }

  redirectToArticlesResults() {
    let storeArticlesLink = '/tabs/storeArticles';
    this.router.navigate([storeArticlesLink]);
  }

  accessStore() {
    this.storeService.changeGetByStoreRequest(this.storeRequest)
    let storeArticlesLink = '/tabs/categories';
    this.router.navigate([storeArticlesLink]);
  }
}
