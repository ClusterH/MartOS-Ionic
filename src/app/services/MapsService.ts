
import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMap, MyLocation } from '@ionic-native/google-maps';
import { UserCoordinates } from '../models/UserCoordinates';
import { BehaviorSubject } from 'rxjs';
import { StoreItem } from '../models/StoreItem';
import { OnlineProduct } from '../models/OnlineProduct';
import { OnlineArticle } from '../models/OnlineArticle';
import { Location } from '../models/Location';
import { ShoppingList } from '../shopping-list/models/shopping-list.model';
import { SlideMapStore } from '../models/SlideMapStore';

@Injectable({
    providedIn: 'root'
  })
  
export class MapsService {    
    token: string;
    map: GoogleMap;
    actualUserCoordinates : UserCoordinates;
    activeDirection=false;

    deleteDirection : string;
    private deleteDirection$ = new BehaviorSubject<string>(this.deleteDirection);
    currentDeleteDirection = this.deleteDirection$.asObservable();

    search : string;
    private search$ = new BehaviorSubject<string>(this.search);
    currentSearch = this.search$.asObservable();
  
    storeItems : SlideMapStore;
    private storeItems$ = new BehaviorSubject<SlideMapStore>(this.storeItems);
    currentstoreItems = this.storeItems$.asObservable();

    shopDetail : StoreItem;
    private shopDetail$ = new BehaviorSubject<StoreItem>(this.shopDetail);
    currentshopDetail = this.shopDetail$.asObservable();

    storeId : string;
    private storeId$ = new BehaviorSubject<string>(this.storeId);
    currentStoreId = this.storeId$.asObservable();
    
    storeProducts : OnlineProduct[];
    private storeProducts$ = new BehaviorSubject<OnlineProduct[]>(this.storeProducts);
    currentStoreProducts = this.storeProducts$.asObservable();

    shoppingList : ShoppingList;
    goListLocation : Location[];
    private goListLocation$ = new BehaviorSubject<any>({shoppingListLoc: this.shoppingList,location:this.goListLocation,differentPage:false});
    currentGoListLocation = this.goListLocation$.asObservable();

    goPopProduct : OnlineArticle;
    differentPage : boolean;
    private goPopProduct$ = new BehaviorSubject<any>({product: this.goPopProduct, differentPage: this.differentPage});
    currentGoPopProduct = this.goPopProduct$.asObservable();

    changeDeleteDirections(deleteDirection : string) {
      this.deleteDirection$.next(deleteDirection);
    }

    changeStoreItems(storeItem : SlideMapStore) {
      this.storeItems$.next(storeItem);
    }

    changeSearch(search : string) {
      this.search$.next(search);
    }

    changeShopDetail(shopDetail : StoreItem) {
      this.shopDetail$.next(shopDetail);
    }

    changeStoreId(storeId : string) {
      this.storeId$.next(storeId);
    }

    changStoreProducts(products : OnlineProduct[]) {
      this.storeProducts$.next(products);
    }

    changePopUpGoProducts(goPopProduct : OnlineArticle, differentPage: boolean) {
      this.goPopProduct$.next({product: goPopProduct,differentPage:differentPage});     
      this.activeDirection=true;
    }

    changeGoListLocation(shoppingList: ShoppingList, goListLocation : Location[],differentPage?:boolean) {
      this.goListLocation$.next({shoppingListLoc : shoppingList, location:goListLocation,differentPage:differentPage});
      this.activeDirection=true;
    }

    stopDirection(){
      this.goListLocation$.next(null);
      this.goPopProduct$.next(null);
      this.activeDirection=false;
    }

    loadMap() {
      
      if (this.map == undefined || this.map == null) {
          this.map = GoogleMaps.create('map_canvas', {

              camera: {
                zoom: 50,
                tilt: 30
              }
          });
          
          return this.map             
      } 
      return this.map;
    }
}