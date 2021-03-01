import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { CategoriesClient } from '../../clients/CategoriesClient';
import { CategoryInfo } from '../../models/CategoryInfo';
import { UserCoordinates } from '../../models/UserCoordinates';
import { GetCategoriesRequest } from '../../requests/GetCategoriesRequest';
import { GetByCategoryRequest } from '../../requests/GetByCategoryRequest';
import { CategoriesService } from '../../services/CategoriesService';
import { LiveLocationService } from '../../services/LiveLocationService';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public activeIndex = 0;
  @ViewChild('slides', { static: true }) slides: IonSlides;


  count: number = 0;
  request: GetCategoriesRequest;
  catRequest: GetByCategoryRequest;
  actualUserCoordinates: UserCoordinates;
  public categories: Array<CategoryInfo> = [];
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
  
  async ngOnInit() {
    await this.loadCategories();
  }

  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
      this.activeIndex = index;
    });
  }

  async loadCategories() {
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
        country :"France"
      };
  
      (await this.categoriesClient.Get(this.request)).subscribe((categories) => {
        resolve(categories);
        this.categories = categories
      });
  });
  }

  async selectCategory(category : string) {    
    this.categoriesService.changeCategory(category);
    this.router.navigateByUrl('/category');
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
