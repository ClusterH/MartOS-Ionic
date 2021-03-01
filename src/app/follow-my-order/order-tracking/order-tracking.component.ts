import { Subscription } from 'rxjs';
import { Order } from './../../models/Order';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute, Params } from '@angular/router';
import { DeliveryOrdersClient } from '../../my-orders/checkout/clients/DeliveryOrdersClient';
import { GetOrderRequest } from '../../requests/GetOrderRequest';
import { DeliveryClientOrder } from '../../models/DeliveryClientOrder';
import { DeliveryOrdersService } from '../../services/DeliveryOrdersService';
import { MapSkin } from '../../services/MapSkin';
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
import { DeliveryRider } from 'src/app/models/DeliveryRider';
import { LiveLocationService } from 'src/app/services/LiveLocationService';
import { ListDirections } from '../../models/ListDirections';
import { Location } from '../../models/Location';
import { Point } from '../../models/Point';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  orderId: string;
  order = {
    status: "ready9",
    remainingTime: "30",
    nextStation: "Nike Store",
    totalSteps: 3,
    currentStep: 2,
    deliveryType: 'Delivery',
    shippingAddres: '11 rue de rivoli, 75001 Paris',
    driver: {
      image: "../../assets/images/driver.png",
      name: "Dan Jones",
      mobileNumber: "+961 123456",
    },
    items: [
      {
        brandName:'Eco design',
        itemName: "T-shirt uni en coton BIO",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/items.png",
        size: 38
      },
      {
        brandName:'Lux eor',
        itemName: "T-Shirt",
        quantity: 1,
        price: 123,
        color: "White - Unique Size",
        image: "../../assets/images/image-2.png",
        size: 38
      },
      {
        brandName:'Tex as Instrument',
        itemName: "Calculatrice",
        quantity: 1,
        price: 123,
        color: "White - Unique Size",
        image: "../../assets/images/image-3.png",
        size: 38
      }
    ],
    subtotal: 120.99,
    paymentProcessingFee: 1.99,
    tax: 1.99,
    total: 123.99,
    currency: "$"
  }

  orderLabel = "";
  deliveryFirstMessage = "";
  deliverySecondMessage = "";
  deliverySteps = [];
  deliveryClientOrder: DeliveryClientOrder;
  deliveryRiderSubscription: Subscription;
  deliveryStepSubscription: Subscription;
  deliveryLocationSubscription: Subscription;
  closeDeliverySubscription: Subscription;
  marker: Marker;
  map: GoogleMap;
  latLng : LatLng;
  directionsPath : Polyline;
  locationToGo: Location[] = [];
  points: Point[];
  gmarkers = [] = [];

  private readonly mapSkin: MapSkin;
  
  constructor(private route: ActivatedRoute, 
    private callNumber: CallNumber,
    private deliveryOrdersClient: DeliveryOrdersClient,
    private deliveryOrdersService: DeliveryOrdersService,
    private liveLocationService: LiveLocationService,
    mapSkin: MapSkin) {
      this.mapSkin = mapSkin;
     }

  async ngOnInit() {
    this.deliveryClientOrder = <DeliveryClientOrder> {
      address:"",
      deliveryRider: <DeliveryRider>{
        deliveryUserId: "",
        imageUrl:"",
        lastName:"",
        name:"",
        phoneNumber:""
      },
      deliverySteps: [],
      displayId:"",
      nextStoreToGo:"",
      duration:"",
      status:"",
      totalPrice:0,
      clientId:"",
      orderId:"",
      articles: [],
    };

    this.loadMap();
    // let location = await this.liveLocationService.getLocation();
    // let latlng = <LatLng>{
    //   lat: location.lat,
    //   lng: location.lng
    // };
    
    this.deliveryRiderSubscription = this.deliveryOrdersService.currentdeliveryRider.subscribe(rider => {
      if (!rider) {
        return;
      }

      if (this.deliveryClientOrder.orderId == rider.orderId) {
        this.deliveryClientOrder.deliveryRider = rider;
        this.deliveryClientOrder.routeDirection = rider.routeDirection;
        this.deliveryClientOrder.nextStoreToGo = rider.nextStoreToGo;
        this.deliverySecondMessage = `Your rider is heading to ${this.deliveryClientOrder.nextStoreToGo}`;
        this.deliveryClientOrder.duration = rider.duration;
        this.latLng = <LatLng>{
          lat: this.deliveryClientOrder.deliveryRider.location.coordinates[1],
          lng: this.deliveryClientOrder.deliveryRider.location.coordinates[0]
        };
  
        this.addMarkerToListLocation(rider.routeDirection); 
      }
    });

    this.deliveryStepSubscription = this.deliveryOrdersService.currentDeliveryStep.subscribe(step => {
      if (!step) {
        return;
      }
      
      if (step.orderId == this.deliveryClientOrder.orderId) 
      {
        this.deliveryClientOrder.deliverySteps.forEach(actualStep => {
          if (actualStep.refStoreId == step.refStoreId) {
            actualStep.isPickedUp = true;
            this.deliveryClientOrder.routeDirection = step.routeDirection;
            this.deliveryClientOrder.duration = step.duration;
            this.deliveryClientOrder.nextStoreToGo = step.nextStoreToGo
            this.deliverySecondMessage = `Your rider is heading to ${this.deliveryClientOrder.nextStoreToGo}`;
            this.addMarkerToListLocation(this.deliveryClientOrder.routeDirection); 
          }
        });   
      } 
    });

    this.deliveryLocationSubscription = this.deliveryOrdersService.currentDeliveryLocation.subscribe(data => {
      if (!data) {
        return;
      }
      
      if (this.deliveryClientOrder.orderId == data.orderId) {
        if (this.latLng == null || this.latLng == undefined) {
          this.latLng = <LatLng>{
            lat: data.location.coordinates[1],
            lng: data.location.coordinates[0]
          };
        } else {
          this.latLng.lat = data.location.coordinates[1];
          this.latLng.lng = data.location.coordinates[0];
        }
  
        this.createLocationMarker(this.latLng);
      }
    });

    this.closeDeliverySubscription = this.deliveryOrdersService.currentCloseDeliveryMessage.subscribe(close => {
      if (!close) {
        return;
      }

      if (this.deliveryClientOrder.orderId == close.orderId) {
        this.deliverySecondMessage = `Delivery is done`;
        this.deliveryClientOrder.status = "Done";
        this.deliveryClientOrder.duration = "0";
        this.locationToGo = [];
        this.removeMarkers();
        this.points = [];
        if (this.directionsPath != null && this.directionsPath != undefined) {
          this.directionsPath.remove();      
        }    
      }
    });

    this.routeSub = this.route.params
      .subscribe(
        (params: Params) => {
          this.orderId = params['id'];
        }
      );
 
      let request = <GetOrderRequest> {
        country: "France",
        orderId: this.orderId
      };

      if (this.orderId == null || this.orderId == undefined || this.orderId == "1") {
        this.loadMap();
        return new Promise(async (resolve) => {
          (await this.deliveryOrdersClient.GetLatest(request)).subscribe(deliveryOrder => {
            resolve(deliveryOrder);
            this.deliveryClientOrder = deliveryOrder;
            if (this.deliveryClientOrder.routeDirection != null && this.deliveryClientOrder.routeDirection != undefined) {
              this.deliverySecondMessage = `Your rider is heading to ${this.deliveryClientOrder.nextStoreToGo}`;
              this.addMarkerToListLocation(this.deliveryClientOrder.routeDirection);
            }
          });
          this.initializeApp();
        });
      } else {
        return new Promise(async (resolve) => {
          (await this.deliveryOrdersClient.GetById(request)).subscribe(deliveryOrder => {
            resolve(deliveryOrder);
            this.deliveryClientOrder = deliveryOrder;
            if (this.deliveryClientOrder.routeDirection != null && this.deliveryClientOrder.routeDirection != undefined) {
              this.deliverySecondMessage = `Your rider is heading to ${this.deliveryClientOrder.nextStoreToGo}`;
              this.addMarkerToListLocation(this.deliveryClientOrder.routeDirection);
            }
            console.log(deliveryOrder)
          });
          this.initializeApp();
        });
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

  removeMarkers(){
    if (this.gmarkers != []) {
      this.gmarkers.forEach(marker => {
        marker.setVisible(false);
    }); 
    this.gmarkers = [];
    }
  }

  async addMarkerToListLocation(list: ListDirections) {    
    this.locationToGo = [];
    this.removeMarkers();
    this.points = [];
 
    if (this.directionsPath != null && this.directionsPath != undefined) {
      this.directionsPath.remove();      
    }

    this.latLng = <LatLng>{
      lng: list.riderLocation.coordinates[0],
      lat: list.riderLocation.coordinates[1]
    };

    this.createLocationMarker(this.latLng);
    list.storesLocation.forEach(store => {
       this.addMarkers(store);
    });
      
    this.addMarkers(list.clientLocation);
    this.points = list.points;
      this.directionsPath = this.map.addPolylineSync({
        points: list.points,
        'color' : '#AA00FF',
        'width': 5,
        'geodesic': true
      });
  }

  addMarkers(location: Location) {
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
      animation: GoogleMapsAnimation.BOUNCE
    })
    .then((marker: Marker) => {
          this.gmarkers.push(marker);
         }); 
  }
  
  createLocationMarker(latLng :LatLng) {
    if (this.marker != null || this.marker != undefined) {
     this.marker.setPosition({
        lat: latLng.lat,
        lng: latLng.lng
      });
    } else {
     this.map.animateCamera({
       target: latLng,
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

    // if (this.directionsPath != null || this.directionsPath != undefined) {
    //   this.correctPolylinePath(latLng);
    // }
 }

  ngOnDestroy() {
    this.routeSub.unsubscribe();

    if(this.deliveryRiderSubscription){
      this.deliveryRiderSubscription.unsubscribe();
    }

    if(this.deliveryStepSubscription){
      this.deliveryStepSubscription.unsubscribe();
    }

    if(this.deliveryLocationSubscription){
      this.deliveryLocationSubscription.unsubscribe();
    }

    if(this.closeDeliverySubscription){
      this.closeDeliverySubscription.unsubscribe();
    }

    this.deliveryOrdersService.changeDeliveryRider(null);
    this.deliveryOrdersService.changeDeliveryStep(null);
    this.deliveryOrdersService.changeDeliveryLocation(null);
    this.deliveryOrdersService.changeCloseDelivery(null);
  }

  initializeApp() {
    this.orderLabel = "Order #" + this.orderId;
    if (this.order.status === "ready") {
      this.deliveryFirstMessage = "Your order is"
      this.deliverySecondMessage = "Ready";
    } else {
      this.deliveryFirstMessage = "Your order will be delivered";
      this.deliverySecondMessage = `waiting `;
      this.buildDeliverySteps();
    }
  }

  buildDeliverySteps() {
    for (let i = 0; i < this.order.totalSteps; i++) {
      this.deliverySteps.push({ arrived: this.order.currentStep > i ? true : false });
    }
  }

  callDriver() {
    console.log('call driver clicked')
    this.callNumber.callNumber(this.order.driver.mobileNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  troubleButton() {
    console.log('click trouble button')
  }

}
