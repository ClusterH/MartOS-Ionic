import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CategoryInfo } from '../../../models/CategoryInfo';
import { CategoriesService } from '../../../services/CategoriesService';
import { CategoriesClient } from '../../../clients/CategoriesClient';
import { UserCoordinates } from '../../../models/UserCoordinates';
import { GetCategoriesRequest } from '../../../requests/GetCategoriesRequest';
import { Subscription } from 'rxjs';
import { LiveLocationService } from '../../../services/LiveLocationService';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  public activeIndex = 0;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  
  subCategorySubscription: Subscription;
  
  public categories: Array<CategoryInfo> = [];
  request: GetCategoriesRequest;
  public currentCat: string;
  private categoriesClient: CategoriesClient;
  private readonly categoriesService : CategoriesService;
  constructor(private router: Router,
    categoriesService : CategoriesService,
     categoriesClient: CategoriesClient,
     private liveLocationService: LiveLocationService) { 
      this.categoriesClient = categoriesClient;
      this.categoriesService = categoriesService;
  }
  
  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
      this.activeIndex = index;
    });
  }
  
  selectCategory(category : string) {
    //alert(category)
    this.categoriesService.changeSubCategory(category);
    this.router.navigateByUrl('/category');
   }

  ngOnInit() {
    this.subCategorySubscription = this.categoriesService.currentCategory.subscribe(async category => {
       if (!category) {
         return;
       }
      
         this.currentCat = category;
         await this.loadSubCategory();
     });   
  }

  ngOnDestroy(){
    if(this.subCategorySubscription){
      this.subCategorySubscription.unsubscribe();
    }
    
     this.categoriesService.changeSubCategory(null);
  }

  async loadSubCategory() {
    return new Promise(async (resolve) => {
      let location = await this.liveLocationService.getLocation();
      resolve(location);

      let userCoordinates = <UserCoordinates>
      {    
        longitude: location.lng,
        latitude: location.lat,
        country: "France"
      }
      this.request = <GetCategoriesRequest>
      {
        userCoordinates : userCoordinates,
        country :"France",
        categoryName: this.currentCat
      };
  
      console.log(this.request);

      //this.categoriesService.changeCategory(this.currentCat);
      (await this.categoriesClient.GetSubCatByCategories(this.request)).subscribe((categories) => {
        resolve(categories);
        this.categories = categories
        console.log(this.categories);
      });
    });
  }

  action(type) {
    switch (type) {
      case 'NEXT':
        this.slides.slideNext();
        break;
      case 'PREV':
        this.slides.slidePrev();
        break;
    }
   }

}
