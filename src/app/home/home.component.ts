import { AppService } from 'src/app/services/AppService';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnlineProduct } from '../models/OnlineProduct';
import { OnlineProductClient } from '../clients/OnlineProductClient';
import { UserCoordinates } from '../models/UserCoordinates';
import { GetLatestsRequest } from '../requests/GetLatestsRequest';
import { GetByCategoryRequest } from '../requests/GetByCategoryRequest';
import { CategoriesClient } from '../clients/CategoriesClient';
import { GetCategoriesRequest } from '../requests/GetCategoriesRequest';
import { CategoryValues } from '../models/CategoryValues';
import { OnlineProductsService } from '../services/OnlineProductsService';
import { IAuthAction } from 'ionic-appauth';
import { Subscription } from 'rxjs';
import { LiveLocationService } from '../services/LiveLocationService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public itemDisplayCount = 4;
  public itemsCatDisplayCount = 4;
  public categoriesList: Array<any> = [];
  public subcategories: Array<any> = [];
  public categories: CategoryValues[] = [];
  public isSidebarEnabled = false;
  public filters: Array<any> = [];
  public skipByLatest: number = 0;
  public takeByLatest: number = 4;
  public skipByCategory: number = 0;
  public takeByCategory: number = 4;
  public latestCount: number = 0;
  public categoryCount: number = 0;
  public subCategory: string = "";
  public category: string = "";
  public randomCatName: string = "";
  public clickedCatName: string = "";

  subProductsSubscription: Subscription;
  subCategorySubscription: Subscription;
  onlineCatSubscription: Subscription;
  subCategoryProSubscription: Subscription;

  request: GetLatestsRequest;
  catRequest: GetByCategoryRequest;
  actualUserCoordinates: UserCoordinates;
  catValuesrequest: GetCategoriesRequest;
  public items: Array<OnlineProduct> = [];
  public itemsCat: Array<OnlineProduct> = [];

  action: IAuthAction;

  private readonly onlineProductsService: OnlineProductsService;
  private onlineProductClient: OnlineProductClient
  private categoriesClient: CategoriesClient;
  constructor(private _appService: AppService,
    categoriesClient: CategoriesClient,
    onlineProductClient: OnlineProductClient,
    onlineProductsService: OnlineProductsService,
    private liveLocationService: LiveLocationService) {
    this.onlineProductClient = onlineProductClient;
    this.categoriesClient = categoriesClient;
    this.onlineProductsService = onlineProductsService;
  }

  async ngOnInit() {
    this.subProductsSubscription = this.onlineProductsService.currentOnlineSubProducts.subscribe(subProducts => {
      if (!subProducts) {
        return;
      }

      this.items = subProducts
      this.latestCount = 0;
      this.skipByLatest = 0;
      this.takeByLatest = 4;
      this.itemDisplayCount = 4;
    });

    this.subCategorySubscription = this.onlineProductsService.currentSubCategory.subscribe(subcategory => {
      if (!subcategory) {
        return;
      }
      
      if (subcategory != null || subcategory != undefined) {
        this.clickedCatName = subcategory;
      }

      this.subCategory = subcategory
    });

    this.onlineCatSubscription = this.onlineProductsService.currentOnlineCatProducts.subscribe(catProducts => {
      if (!catProducts) {
        return;
      }
      
      this.itemsCat = catProducts;
      this.itemsCatDisplayCount = 4;
    });

    this.subCategoryProSubscription = this.onlineProductsService.currentSubCategory.subscribe(category => {
      if (!category) {
        return;
      }

      if (category != null || category != undefined) {
        this.clickedCatName = category;
      }
      this.category = category
    });
    
    this.clickedCatName = "Latest Arrivals";
    await this.loadProducts();
    await this.subscribe();
  }

  async ngOnDestroy() {
    if (this.subProductsSubscription) {
      this.subProductsSubscription.unsubscribe();
    }

    if (this.subCategorySubscription) {
      this.subCategorySubscription.unsubscribe();
    }

    if (this.onlineCatSubscription) {
      this.onlineCatSubscription.unsubscribe();
    }

    if (this.subCategoryProSubscription) {
      this.subCategoryProSubscription.unsubscribe();
    }

    this.onlineProductsService.changeSubProducts(null);
    this.onlineProductsService.changeSubCategory(null);
    this.onlineProductsService.changeCatProducts(null);
  }

  async loadProducts() {
    return new Promise(async (resolve) => {
      
      let location = await this.liveLocationService.getLocation();
      resolve(location);
      
      let userCoordinates = <UserCoordinates>
        {
          longitude: location.lng,
          latitude: location.lat,
          country: "France"
        }
        
      this.request = <GetLatestsRequest>
        {
          userCoordinates: userCoordinates,
          country: "France",
          skip: this.skipByLatest,
          take: this.takeByLatest
        };

      this.catRequest = <GetByCategoryRequest>
        {
          userCoordinates: userCoordinates,
          categoryName: "",
          country: "France",
          skip: this.skipByCategory,
          take: this.takeByCategory
        };

      this.catValuesrequest = <GetCategoriesRequest>
        {
          userCoordinates: userCoordinates,
          country: "France"
        };

      (await this.onlineProductClient.GetLatests(this.request)).subscribe((products) => {
        resolve(products);
        this.items = products     
      });

      (await this.onlineProductClient.Getbycategory(this.catRequest)).subscribe((products) => {
        resolve(products);
        this.randomCatName = products.categoryName;
        this.itemsCat = products.onlineProducts
      });

      (await this.categoriesClient.GetCategoryValues(this.catValuesrequest)).subscribe((products) => {
        resolve(products);
        this.filters = products;
        this.categories = products;
      });
  });

  }

  async showMoreLatestItems() {
    this.latestCount = this.latestCount + 1;
    if (this.latestCount == 1) {
      this.skipByLatest = 4;
      this.takeByLatest = 14;
    } else {
      this.skipByLatest = this.skipByCategory + 10;
      this.takeByLatest = this.takeByCategory + 10;
    }

    if (this.subCategory == "" || this.subCategory == "all") {
      await this.getLatestItems();
    } else {
      await this.getCategories("subCategory");
    }
  }

  async getLatestItems() {
    return new Promise(async (resolve) => {    
      let location = await this.liveLocationService.getLocation();
      resolve(location);
      
      let userCoordinates = <UserCoordinates>
        {
          longitude: location.lng,
          latitude: location.lat,
          country: "France"
        };

      this.request = <GetLatestsRequest>
        {
          userCoordinates: userCoordinates,
          country: "France",
          skip: this.skipByLatest,
          take: this.takeByLatest
        };

      (await this.onlineProductClient.GetLatests(this.request)).subscribe((products) => {
        resolve(products);
        this.items.push(...products);
        console.log(this.items)
      });
   
    this.itemDisplayCount += 10;
  });
  }

  async showMoreCategoryItems() {
    this.categoryCount = this.categoryCount + 1;
    if (this.categoryCount == 1) {
      this.skipByCategory = 4;
      this.takeByCategory = 14;
    } else {
      this.skipByCategory = this.skipByCategory + 10;
      this.takeByCategory = this.takeByCategory + 10;
    }
    await this.getCategories("");
  }

  async getCategories(listingType: string) {
    return new Promise(async (resolve) => {
      let location = await this.liveLocationService.getLocation();
      resolve(location);
      
      let userCoordinates = <UserCoordinates>
        {
          longitude: location.lng,
          latitude: location.lat,
          country: "France"
        };

      let listingCatType: string = "";
      let skip: number;
      let take: number;
      if (listingType == "subCategory") {
        listingCatType = this.subCategory;
        skip = this.skipByLatest;
        take = this.takeByLatest;
      } else {
        listingCatType = this.category;
        skip = this.skipByCategory;
        take = this.takeByCategory;
      }

      this.catRequest = <GetByCategoryRequest>
        {
          userCoordinates: userCoordinates,
          country: "France",
          skip: skip,
          take: take,
          categoryName: listingCatType
        };

      (await this.onlineProductClient.Getbycategory(this.catRequest)).subscribe((products) => {
        resolve(products);
        if (listingType == "subCategory") {
          this.items.push(...products.onlineProducts);
          this.itemDisplayCount += 10;
        } else {
          this.itemsCat.push(...products.onlineProducts);
          this.itemsCatDisplayCount += 10;
        }
        console.log(this.items)
      });    
   });
  }

  selectMenuItem({ id }) {
    let subs: Array<any> = [];
    this.categories.forEach(category => {
      if (category.id == id) {
        console.log(category.values)
        category.values.forEach(element => {
          let sub: {} = { name: element.name }
          subs.push(sub);
        });
        this.categoriesList = subs;
      }
    });
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
