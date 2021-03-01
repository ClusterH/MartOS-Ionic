import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/ArticleService';
import { ArticleData } from '../../models/ArticleData';

@Component({
  selector: 'app-storeArticles',
  templateUrl: 'storeArticles.page.html',
  styleUrls: ['storeArticles.page.scss']
})
export class StoreArticlesPage implements OnInit{
  articleDatas : ArticleData[];

  private readonly articleService : ArticleService;
  constructor(articleService : ArticleService) {
    this.articleService = articleService; 
  }

  ngOnInit(){
  //   this.articleService.currentArticleDatas.subscribe(val =>{
  //     this.articleDatas = val
  // });
  }
 
  articleDetails(){

  }

  searchInStore(){

  }
}
