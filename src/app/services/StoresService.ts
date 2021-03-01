
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GetByStoreRequest } from '../requests/GetByStoreRequest';
import { CategoryView } from '../models/CategoryView';
import { ArticleData } from '../models/ArticleData';

@Injectable({
    providedIn: 'root'
  })
  
export class StoresService {
  getByStoreRequest : GetByStoreRequest;
  private getByStoreRequest$ = new BehaviorSubject<GetByStoreRequest>(this.getByStoreRequest);
  currentGetByStoreRequest = this.getByStoreRequest$.asObservable();

  categories : string[];
  private categories$ = new BehaviorSubject<string[]>(this.categories);
  currentCategories = this.categories$.asObservable();

  categoriesView: CategoryView;
  private categoriesView$ = new BehaviorSubject<CategoryView>(this.categoriesView);
  currentcategoriesView = this.categoriesView$.asObservable();

  articleDatas : ArticleData[];
  private articleDatas$ = new BehaviorSubject<ArticleData[]>(this.articleDatas);
  currentArticleDatas = this.articleDatas$.asObservable();

  changeArticleData(articleDatas : ArticleData[]) {
    this.articleDatas$.next(articleDatas);
  }
  
  changeGetByStoreRequest(request : GetByStoreRequest) {
  this.getByStoreRequest$.next(request);
  }
  
  changeCategories(categories : string[]) {
    this.categories$.next(categories);
  }
  
  changeCategoriesView(categoriesView : CategoryView) {
        this.categoriesView$.next(categoriesView);
  }
}