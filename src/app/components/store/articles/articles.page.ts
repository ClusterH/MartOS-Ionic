import { Component, OnInit } from '@angular/core';
import { ArticleData } from '../../../models/ArticleData';
import { StoresService } from '../../../services/StoresService';

@Component({
  selector: 'app-articles',
  templateUrl: 'articles.page.html',
  styleUrls: ['articles.page.scss']
})
export class ArticlesPage implements OnInit{
  articleDatas : ArticleData[];

  private readonly storesService : StoresService;
  constructor(storesService : StoresService) {
    this.storesService = storesService; 
  }

  ngOnInit(){
    this.storesService.currentArticleDatas.subscribe(val =>{
      this.articleDatas = val
  });
  }
 
  articleDetails(){

  }

  searchInStore(){

  }
}
