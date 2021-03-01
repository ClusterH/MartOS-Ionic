import { Component, OnInit } from '@angular/core';
import { ArticlesClient } from '../../../clients/ArticlesClient';
import { StoresService } from '../../../services/StoresService';
import { GetByStoreRequest } from '../../../requests/GetByStoreRequest';
import { StoreView } from '../../../models/StoreView';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit{
  request : GetByStoreRequest;
  categories : string[] = [];
  storeView : StoreView;

  private readonly storesService : StoresService;
  private readonly articlesClient : ArticlesClient;
  private readonly router : Router;
  constructor(storesService : StoresService,
    articlesClient : ArticlesClient,
    router : Router) {
    this.storesService = storesService;
    this.articlesClient = articlesClient;
    this.router = router; 
  }

  async ngOnInit(){
    this.storesService.currentGetByStoreRequest.subscribe(val =>{
      this.request = val
      this.GetStoreView(val);
  });
  }

  categorySelected(category : string){
    this.storeView.categorView.forEach(catView => {
      if (category == catView.name) {
        this.storesService.changeCategoriesView(catView);
        let productTypeLink = '/tabs/productTypes';
        this.router.navigate([productTypeLink]);
      }
    });
  }

  async GetStoreView(request : GetByStoreRequest){
    (await this.articlesClient.GetbyStoreCategories(request)).subscribe(val => {
      this.storeView = val;
      this.categories = val.categories;
      //this.storesService.changeCategories(val.categories);
     });
  }
}
