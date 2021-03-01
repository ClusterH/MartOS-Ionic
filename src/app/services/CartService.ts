
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnlineArticle } from '../models/OnlineArticle';
import { Cart } from '../models/Cart';

@Injectable({
    providedIn: 'root'
  })
  
export class CartService {
  savedItems = '';
  chosenArticleRequest : OnlineArticle;
  public chosenArticleRequest$ = new BehaviorSubject<OnlineArticle>(this.chosenArticleRequest);
  currentChosenArticleRequest = this.chosenArticleRequest$.asObservable();
 
  cartCheckout : Cart;
  public cartCheckout$ = new BehaviorSubject<Cart>(this.cartCheckout);
  currentCartCheckout = this.cartCheckout$.asObservable();
 

  changeCartArticle(article : OnlineArticle) {
    this.chosenArticleRequest$.next(article);
  }

  changeCartCheckout(cart : Cart) {
    this.cartCheckout$.next(cart);
  }
}