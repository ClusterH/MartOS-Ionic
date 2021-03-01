import { AppService } from 'src/app/services/AppService';
import { Component, OnInit } from '@angular/core';
import { CategoriesClient } from '../../clients/CategoriesClient';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { OnlineProductClient } from '../../clients/OnlineProductClient';
import { OnlineProduct } from '../../models/OnlineProduct';
import { GetLatestsRequest } from '../../requests/GetLatestsRequest';
import { UserCoordinates } from '../../models/UserCoordinates';
import { GetByLocationRequest } from '../../requests/GetByLocationRequest';
import { LiveLocationService } from '../../services/LiveLocationService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [Keyboard]
})
export class SearchComponent implements OnInit {
  public itemDisplayCount = 100;
  public categoriesList = [];
  public isSidebarEnabled = false;
  queryText: string;
  countsearch: number = 0;
  request: GetLatestsRequest;
  public skipBySearch: number = 0;
  public takeBySearch: number = 4;
  public items: Array<OnlineProduct> = [];  
  searchRequest: GetByLocationRequest;
  private onlineProductClient: OnlineProductClient
  private categoriesClient: CategoriesClient;
  constructor(categoriesClient: CategoriesClient,
    private liveLocationService: LiveLocationService,
    onlineProductClient: OnlineProductClient,    
    private _appService: AppService,
    private keyboard: Keyboard) {
      this.onlineProductClient = onlineProductClient;
      this.categoriesClient = categoriesClient;
  }

  async ngOnInit() {
    this.subscribe();
    await this.loadProducts();
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
        userCoordinates : userCoordinates,
        country :"France",
        skip: 0,
        take: 4
      };

      (await this.onlineProductClient.GetLatests(this.request)).subscribe((products) => {
        resolve(products);
        this.items = products
      });

      (this.categoriesClient.GetTopCategories()).subscribe((categories) => {
        resolve(categories);
        this.categoriesList = categories;
      });   
  });
  }

  async searchByKeyword(event: any){
    this.queryText = event.srcElement.value
    await this.search();
  }

  async search (){
    this.keyboard.hide();
    return new Promise(async (resolve) => {    
      let location = await this.liveLocationService.getLocation();
      resolve(location);
      
        let userCoordinates = <UserCoordinates>
        {    
          longitude: location.lng,
          latitude: location.lat,
          country: "France"
        }

        this.searchRequest = <GetByLocationRequest>
        {
          userCoordinates : userCoordinates,
          search: this.queryText,
          country :"France",
          skip: this.skipBySearch,
          take: 100
        };

        (await this.onlineProductClient.GetByLocation(this.searchRequest)).subscribe(products => {
          resolve(products);
          this.items = products;
        });
      
    this.itemDisplayCount += 10;
    });
  }

  async showMoreItems() {
  }

  selectMenuItem({ id }) {
   // this.categoriesList = id % 2 ? this.categories : this.categories2;
  }

  toggleSideBar() {
  }

  subscribe() {
    this._appService.isSideBarEnabled.subscribe((value) => {
      this.isSidebarEnabled = value;
    });
  }
  asd($event){
    console.log($event)
    if($event.key == 'Enter' || $event.code == 'Enter'){
      this.search();
    }
  }

}
