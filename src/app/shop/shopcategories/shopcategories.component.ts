import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesClient } from '../../clients/CategoriesClient';
import { GetByStoreRequest } from '../../requests/GetByStoreRequest';
import { MapsService } from '../../services/MapsService';
import { CategoryInfo } from '../../models/CategoryInfo';
import { MyLocation, GoogleMap } from '@ionic-native/google-maps';
import { GetByReferenceIdRequest } from '../../requests/GetByReferenceIdRequest';
import { OnlineProductClient } from '../../clients/OnlineProductClient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopcategories',
  templateUrl: './shopcategories.component.html',
  styleUrls: ['./shopcategories.component.scss']
})
export class ShopCategoriesComponent implements OnInit, OnDestroy {

  myLocation:  MyLocation;
  categories: CategoryInfo[] = [];
  map: GoogleMap;
  storeId: string;
  storeIdSubscription: Subscription;

  constructor(private categoriesClient: CategoriesClient,
    private mapsService : MapsService,
    private onlineProductClient: OnlineProductClient) {
   }

  ngOnInit() {
    this.storeIdSubscription = this.mapsService.currentStoreId.subscribe(storeId => {
      if (!storeId) {
        return;
       }

       this.storeId = storeId;
       let request = <GetByStoreRequest>{
          country: "France",
          storeId: storeId
       };
      
      this.categoriesClient.GetCategoryByStoreId(request).subscribe((categories:CategoryInfo[]) => {
        this.categories =  categories;
      });
    });
  }

  ngOnDestroy() {
    if(this.storeIdSubscription){
      this.storeIdSubscription.unsubscribe();
    }
    
     this.mapsService.changeStoreId(null);
  }

  async selectCategory(category: string) {

      console.log(location)
      let request = <GetByReferenceIdRequest>
      {
        country :"France",
        category: category,
        referenceId: this.storeId
      };
  
      (await this.onlineProductClient.GetByReferenceId(request)).subscribe((products) => {
        this.mapsService.changStoreProducts(products); 
      });
  }
}
