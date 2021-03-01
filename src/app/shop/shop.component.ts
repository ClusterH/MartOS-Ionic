import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreItem } from '../models/StoreItem';
import { MapsService } from '../services/MapsService';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit, OnDestroy {

  store: StoreItem;
  private readonly mapsService : MapsService;  
  showTimings: boolean = false;

  storeProductsSubscription: Subscription;
  shopDetailSubscription: Subscription;

  constructor(mapsService : MapsService) {
    this.mapsService = mapsService;
   }

  ngOnInit() {
   this.storeProductsSubscription = this.mapsService.currentStoreProducts.subscribe(products => {
      if (!products) {
        return;
       }
       
       this.store.onlineProduct = products;
    });

    this.shopDetailSubscription = this.mapsService.currentshopDetail.subscribe(shop => {
      if (!shop) {
        return;
       }
       
      this.store = shop;
      this.store.timings = "10AM - 6PM Mon"; 
      this.store.weekTimings = [
        "10AM - 6PM Mon",
        "10AM - 6PM Tues",
        "10AM - 6PM Wed",
        "10AM - 6PM Thurs",
        "10AM - 6PM Fri",
        "10AM - 6PM Sat",
        "10AM - 6PM Sun"
      ]
     });
  }

  ngOnDestroy() {
    if(this.storeProductsSubscription){
      this.storeProductsSubscription.unsubscribe();
    }
    
    if(this.shopDetailSubscription){
      this.shopDetailSubscription.unsubscribe();
    }
    
     this.mapsService.changStoreProducts(null);
     this.mapsService.changeShopDetail(null);
  }

  toogleTimings() {
    this.showTimings = !this.showTimings;
  }
}
