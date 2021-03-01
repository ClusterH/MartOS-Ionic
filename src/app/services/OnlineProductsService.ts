
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnlineProduct } from '../models/OnlineProduct';

@Injectable({
    providedIn: 'root'
  })
  
export class OnlineProductsService {

  onlineCatProducts : OnlineProduct[];
  private onlineCatProducts$ = new BehaviorSubject<OnlineProduct[]>(this.onlineCatProducts);
  currentOnlineCatProducts = this.onlineCatProducts$.asObservable();

  onlineSubProducts : OnlineProduct[];
  private onlineSubProducts$ = new BehaviorSubject<OnlineProduct[]>(this.onlineSubProducts);
  currentOnlineSubProducts = this.onlineSubProducts$.asObservable();

  subCategory : string;
  private subCategory$ = new BehaviorSubject<string>(this.subCategory);
  currentSubCategory = this.subCategory$.asObservable();

  category : string;
  private category$ = new BehaviorSubject<string>(this.category);
  currentCategory = this.category$.asObservable();

  position : string;
  private position$ = new BehaviorSubject<string>(this.position);
  currentPosition = this.position$.asObservable();

  changePosition(position : string) {
    this.position$.next(position);
  }

  changeCatProducts(onlineCatProducts : OnlineProduct[]) {
    this.onlineSubProducts$.next(onlineCatProducts);
  }
  
  changeSubProducts(onlineSubProducts : OnlineProduct[]) {
    this.onlineSubProducts$.next(onlineSubProducts);
  }

  changeSubCategory(subCategory : string) {
    this.subCategory$.next(subCategory);
  }

  changeCategory(category : string) {
    this.category$.next(category);
  }
}