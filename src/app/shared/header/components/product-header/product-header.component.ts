import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OnlineProductDetail } from '../../../../models/OnlineProductDetail';
import { ProductsDetailService } from '../../../../services/ProductsDetailService';
import { OnlineArticle } from '../../../../models/OnlineArticle';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss'],
})
export class ProductHeaderComponent implements OnInit {
  @Input() disableDeaher;
  previousUrl;
  public productDetail: OnlineProductDetail;
  public articleDetail: OnlineArticle;
  private readonly productsDetailService: ProductsDetailService;
  constructor(private location: Location,
     private router: Router,
     productsDetailService: ProductsDetailService) {
       this.productsDetailService = productsDetailService;
  }

  ngOnInit() {
    this.productsDetailService.currentProductDetail.subscribe(async product => {
      if (!product) {
        this.instanciateProduct();
        return;
      }

       this.productDetail = product; 
       this.articleDetail = product.onlineArticles[0];
     });

     this.productsDetailService.currentArticle.subscribe(async article => {
       if (!article) {
         return;
       }
       this.articleDetail = article;
     });
  }

  instanciateProduct() {
    this.productDetail = <OnlineProductDetail>{
      name : "",
      onlineArticles : []  
    };

    this.articleDetail = <OnlineArticle>{
      price: "0",
      totalStock: 0
      
    };

    this.productDetail.onlineArticles.push(this.articleDetail);
  }


  backClicked() {
    this.location.back(); 
  }
}
