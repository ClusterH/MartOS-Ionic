
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArticleData } from '../models/ArticleData';
import { OnlineProduct } from '../models/OnlineProduct';

@Injectable({
    providedIn: 'root'
  })
  
export class ArticleService {
  
  articleDatas : OnlineProduct[];
  private articleDatas$ = new BehaviorSubject<OnlineProduct[]>(this.articleDatas);
  currentArticleDatas = this.articleDatas$.asObservable();

  changeArticleData(articleDatas : OnlineProduct[]) {
    this.articleDatas$.next(articleDatas);
  }
}