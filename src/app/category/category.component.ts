import { AppService } from 'src/app/services/AppService';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/CategoriesService';
import { MyLocation, GoogleMap } from '@ionic-native/google-maps';
import { GetByCategoryRequest } from '../requests/GetByCategoryRequest';
import { UserCoordinates } from '../models/UserCoordinates';
import { OnlineProductClient } from '../clients/OnlineProductClient';
import { OnlineProduct } from '../models/OnlineProduct';
import { Subscription } from 'rxjs';
import { LiveLocationService } from '../services/LiveLocationService';

@Component({
  selector: 'app-home',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  public itemDisplayCount = 4;
  public itemSalesDisplayCount = 4;
  public bestCount: number = 0;
  public categoriesList = [];
  public isSidebarEnabled = false;
  public skipByBest: number = 0;
  public takeByBest: number = 4;
  public skipBySales: number = 0;
  public takeBySales: number = 4;
  public salesCount: number = 0;
  public clickedCategory: string = "";
  public clickedSubCategory: string = "";

  public items: Array<OnlineProduct> = [];
  public itemSales: Array<OnlineProduct> = [];

  categorySubscription: Subscription;
  subCategorySubscription: Subscription;

  category: string;
  bestRequest: GetByCategoryRequest; 
  salesRequest: GetByCategoryRequest; 
  private readonly categoriesService : CategoriesService;
  private readonly onlineProductClient: OnlineProductClient;
  constructor(private _appService: AppService,
    onlineProductClient: OnlineProductClient,
    categoriesService : CategoriesService,
    private liveLocationService: LiveLocationService) {
      this.onlineProductClient = onlineProductClient;
      this.categoriesService = categoriesService; 
  }

  async ngOnInit() {
    this.categorySubscription = this.categoriesService.currentCategory.subscribe(category => {
      if (!category) {
        return;
      }

      this.clickedCategory = category;
      this.buildViewData(category);
    });

    this.subCategorySubscription = this.categoriesService.currentSubCategory.subscribe(subCategory => {
      if (!subCategory) {
        return;
      }
      
      this.clickedSubCategory = subCategory;
      this.buildViewData(subCategory);
    });
    
    this.subscribe();
  };

  ngOnDestroy(){
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
    
    if(this.subCategorySubscription){
      this.subCategorySubscription.unsubscribe();
    }
    
     this.categoriesService.changeCategory(null);
     this.categoriesService.changeSubCategory(null);
  }

  buildViewData(category: string){
    this.category = category
    this.bestCount = 0; 
    this.skipByBest = 0;
    this.takeByBest = 4;
    this.skipBySales = 0;
    this.takeBySales = 4;
    this.itemDisplayCount = 4;
    this.loadBest(true);
    this.loadSales(true);

  }

  async loadBest(onload: boolean) {
    return new Promise(async (resolve) => {
      let location = await this.liveLocationService.getLocation();
      resolve(location);
      
      let userCoordinates = <UserCoordinates>
      {    
        longitude: location.lng,
        latitude: location.lat,
        country: "France"
      }

      this.bestRequest = <GetByCategoryRequest>
      {
        userCoordinates : userCoordinates,
        country :"France",
        skip: this.skipByBest,
        take: this.takeByBest,
        categoryName: this.category
      };

      (await this.onlineProductClient.GetBestSalesByCategory(this.bestRequest)).subscribe((products) => {
        resolve(products);
        if (onload == true) {
          this.items = products;
        }else {
          this.items.push(...products);
        }
      });      
  });
  }

  async loadSales(onload: boolean) {
    return new Promise(async (resolve) => {
      let location = await this.liveLocationService.getLocation();
      resolve(location);

      let userCoordinates = <UserCoordinates>
      {    
        longitude: location.lng,
        latitude: location.lat,
        country: "France"
      }

      this.salesRequest = <GetByCategoryRequest>
      {
        userCoordinates : userCoordinates,
        country :"France",
        skip: this.skipBySales,
        take: this.takeBySales,
        categoryName: this.category
      };

      (await this.onlineProductClient.GetSalesByCategory(this.salesRequest)).subscribe((products) => {
        resolve(products);
        if (onload == true) {
          this.itemSales = products;
        }else {
          this.itemSales.push(...products);
        }
        });
  });
  }

  async showMoreBestItems() {
    this.bestCount = this.bestCount + 1;
    if (this.bestCount == 1) {
        this.skipByBest  = 4; 
        this.takeByBest = 14;
    } else{
      this.skipByBest = this.skipByBest + 10; 
      this.takeByBest = this.takeByBest + 10;
    }   
    await this.loadBest(false);
    this.itemDisplayCount += 10;
  }

  async showMoreSalesItems() {
    this.salesCount = this.salesCount + 1;
    if (this.salesCount == 1) {
        this.skipBySales  = 4; 
        this.takeBySales = 14;
    } else{
      this.skipBySales = this.skipBySales + 10; 
      this.takeBySales = this.takeBySales + 10;
    }   
    await this.loadSales(false);
    this.itemSalesDisplayCount += 10;
  }

  selectMenuItem({ id }) {
   // this.categoriesList = id % 2 ? this.categories : this.categories2;
  }

  toggleSideBar() {
    alert(123);
  }

  subscribe() {
    this._appService.isSideBarEnabled.subscribe((value) => {
      this.isSidebarEnabled = value;
    });
  }
}
