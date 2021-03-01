import { Component, OnInit } from '@angular/core';
import { ArticleData } from '../../../models/ArticleData';
import { StoresService } from '../../../services/StoresService';
import { Router } from '@angular/router';
import { CategoryView } from '../../../models/CategoryView';
@Component({
  selector: 'app-productTypes',
  templateUrl: 'productTypes.page.html',
  styleUrls: ['productTypes.page.scss']
})
export class ProductTypesPage implements OnInit{
  articleDatas : ArticleData[];
  categoryView : CategoryView;
  productTypes : string[] = [];

  private readonly storesService : StoresService;
  private readonly router : Router;
  constructor(storesService : StoresService,
              router : Router) {
    this.storesService = storesService;
    this.router = router;
  }

  async ngOnInit(){
    this.storesService.currentcategoriesView.subscribe(val =>{
      this.categoryView = val
      this.buildProductTypes(val);
  });
  }

  buildProductTypes(categoryView : CategoryView){
    categoryView.productTypes.forEach(pt => {
      this.productTypes.push(pt.name);
    });
  }

  productTypeSelected(productType : string){
    this.categoryView.productTypes.forEach(ptView => {
      if (productType == ptView.name) {
        this.storesService.changeArticleData(ptView.articlesDatas);
        let storeArticlesLink = '/tabs/articles';
        this.router.navigate([storeArticlesLink]);
      }
    });
  }
}
