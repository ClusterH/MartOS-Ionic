
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnlineProduct } from '../models/OnlineProduct';

@Injectable({
    providedIn: 'root'
  })
  
export class CategoriesService {
  
  onlineCatProducts : OnlineProduct[];
  private onlineCatProducts$ = new BehaviorSubject<OnlineProduct[]>(this.onlineCatProducts);
  currentOnlineCatProducts = this.onlineCatProducts$.asObservable();

  category : string;
  private category$ = new BehaviorSubject<string>(this.category);
  currentCategory = this.category$.asObservable();

  mainCategory : string;
  private mainCategory$ = new BehaviorSubject<string>(this.mainCategory);
  currentMainCategory = this.mainCategory$.asObservable();

  subCategory : string;
  private subCategory$ = new BehaviorSubject<string>(this.subCategory);
  currentSubCategory = this.subCategory$.asObservable();

  changeCategory(category : string) {
    this.category$.next(category);
  }

  changeSubCategory(subCategory : string) {
    this.subCategory$.next(subCategory);
  }

  changeMainCategory(subCategory : string) {
    this.category$.next(subCategory);
  }
}