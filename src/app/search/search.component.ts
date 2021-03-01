import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StoreItem } from '../models/StoreItem';
import { MapsService } from '../services/MapsService';
import { Router } from '@angular/router';
import { AppService } from '../services/AppService';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { GestureController, ModalController, Platform } from '@ionic/angular';
import { ItemPopUpComponent } from './item-pop-up/item-pop-up.component';
import { ProductsDetailService } from '../services/ProductsDetailService';
import { ListPopUpComponent } from './list-pop-up/list-pop-up.component';
import { ShoppingListType, ShoppingList, SingleShoppingList } from '../shopping-list/models/shopping-list.model';
import { Location } from '../models/Location';
import { ShoppingListService } from '../shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [Keyboard]
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: DrawerComponent;
  searchtext = '';
  drawerOpened = false;
  minimumHeight = 0;
  searchName = '';
  delete : string = "delete";
  queryText: string;
  navigation = true;
  allStoresResearch: StoreItem[] = [];
  public isSidebarEnabled = false;
  subscription: Subscription;
  shopListNameSubscription: Subscription;
  storeItemsSubscription: Subscription;
  selectedItem;
  selectedStore;
  scrollPosition = 0;
  private readonly productsDetailService: ProductsDetailService;
  stores: StoreItem[] = [];
  private readonly router: Router;
  shoppingListType = ShoppingListType;
  currentItem: ShoppingList;
  locations: Location[] = [];
  req: SingleShoppingList;
  sliderTitle: string;

  constructor(
    private keyboard: Keyboard,
    private changeRef: ChangeDetectorRef,
    private mapsService: MapsService,
    router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public modalController: ModalController,
    private _appService: AppService,
    private shoppingListService: ShoppingListService) {
    this.mapsService = mapsService;
    this.router = router;
  }



  async ngOnInit() {
    // this.drawerComp.stateChange.subscribe(next => {
    //   console.log({ next });
    // });

    this.storeItemsSubscription = this.mapsService.currentstoreItems.subscribe(slideMapStore => {
      if (!slideMapStore) {
        return;
      }
      
      this.sliderTitle = slideMapStore.name;
      this.stores = slideMapStore.storeItems;
      const products = slideMapStore.storeItems.map(x => x.onlineProduct);
      const flattenedArray = [].concat(...products);
      console.log(flattenedArray);
      this.selectedItem = { onlineProduct: flattenedArray };
      console.log(this.selectedItem);
      if (slideMapStore.storeItems != undefined && slideMapStore.storeItems != null) {
        
      console.log(slideMapStore.storeItems)
        this.drawer.openDrawer(); 
      }
    });
  }

  ngOnDestroy() {
    if (this.storeItemsSubscription) {
      this.storeItemsSubscription.unsubscribe();
    }

    this.mapsService.changeStoreItems(null);
  }

  searchByKeyword(event: any, dontOpenDrawer?) {
    // this.minimumHeight = 200;
    // this.drawerState = DrawerState.Docked;
    this.keyboard.hide();
    this.queryText = event.srcElement.value;
    this.mapsService.changeSearch(this.queryText);
    console.log('toggle drawer');
    // if (!dontOpenDrawer) {
    //   this.drawer.openDrawer();
    // }

  }

  hideNaivgation() {
    this.navigation = true;
  }

  markerClicked(data) {
    if (data.item) {
      console.log('data.item', data.item);
      this.selectedItem = data.item;
      console.log(this.selectedItem);
      this.changeRef.detectChanges();
    }
  }

  toShop(event: string) {
    const store = this.stores.filter(x => x.storeId === event);
    this.mapsService.changeShopDetail(store[0]);
    this.mapsService.changeStoreId(store[0].storeId);
    const shopRoute = `/shop/${event}`;
    this.router.navigate([shopRoute]);
  }

  toggleSideBar() {
    this._appService.toggleSideBar();
  }

  openedDrawer(isVisible) {
    this.drawerOpened = isVisible;
    this.changeDetectorRef.detectChanges();
  }

  updateScrollPosition(event) {
    // console.log('this.scrollPosition', event.target.scrollTop);
    this.scrollPosition = event.target.scrollTop;
  }

  async openDialogue(event) {
    console.log({ event });
    const modal = await this.modalController.create({
      component: ItemPopUpComponent,
      cssClass: 'my-custom-modal'
    });
    modal.onDidDismiss().then((data=>{
      console.log({data})
      if(data.data['slideDown']){
        this.drawer.closeDrawer();
      }
    }))
    return await modal.present();
  }

  async openList(){
    const modal = await this.modalController.create({
      component: ListPopUpComponent,
      cssClass: 'my-list-custom-modal'
    });
    // modal.ondis
    
    return new Promise(async (resolve) => {
    modal.onDidDismiss().then((async data=>{
      console.log({data})
          this.req = {
      country: 'France',
      id: data.data['id']
    };

    (await this.shoppingListService.getListByid(this.req)).subscribe((data: ShoppingList) => {
      resolve(data);
      this.currentItem = data;
      this.currentItem.onlineArticles.forEach(article =>{
      this.locations.push(article.location);
       });

       this.mapsService.changeGoListLocation(data, this.locations);
   
      // let mapRoute = '/tabs/shopnearby';
 
      // this.router.navigate([mapRoute]);
      });
    }));
     await modal.present();
    });
  }
  
  stopdirections(){
    
    this.mapsService.changeDeleteDirections(this.delete);
    this.mapsService.stopDirection();
  }
}
