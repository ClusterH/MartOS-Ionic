import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/Cart';
import { OnlineArticle } from '../../models/OnlineArticle';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/CartService';
import { GetCartRequest } from '../../requests/GetCartRequest';
import { CartRequest } from '../../requests/CartRequest';
import { CartClient } from '../../clients/CartClient';
import { Router } from '@angular/router';
import { round } from '../../shared/utils/math-utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  count: number = 1;
  cart: Cart;
  actualChosenArticle: OnlineArticle;
  countsChanged: boolean = false;
  cartSubscription: Subscription;
  savedArticles='';
  
  private cartService: CartService
  constructor(cartService: CartService,
    private cartClient: CartClient,
    private router: Router) { 
      this.cartService = cartService;
    }

    
  async ngOnInit() {
      
    return new Promise(async (resolve) => {
    this.cartSubscription = this.cartService.currentChosenArticleRequest.subscribe(async article => {
      if (!article || article == null) {
        return;
      }
      
      console.log({article})
      this.cart = <Cart>{
        onlineArticles: [] 
      };

      let request = <GetCartRequest>{
        country: "France"
      };
      
      this.actualChosenArticle = article;
      
      (await this.cartClient.GetCart(request)).subscribe(async (cart) => {
        resolve(cart);
        if (this.actualChosenArticle != null) {
          let aggCart = this.aggregateArticle(this.actualChosenArticle, cart);
          this.calculateBilling(aggCart);
          this.cart = aggCart;
          
          let updateRequest = <CartRequest>{
            country: "France",
            cart: this.cart
          };
          
          this.cart.subTotal = parseInt(this.cart.subTotal.toFixed(1)); 
          
          (await this.cartClient.Update(updateRequest)).subscribe((cart) => {
          });
          //this.cartService.changeCartArticle(null);
        }
      }); 
    });

     if (this.cart == null || this.cart == undefined) {

      this.cart = <Cart>{
         onlineArticles: [] 
       };

       let request = <GetCartRequest>{
         country: "France"
       };

       (await this.cartClient.GetCart(request)).subscribe((cart) => {
          resolve(cart);
         this.cart = cart;
       });
     }
    });
    
  }

  getItemColor(item: OnlineArticle) {
    const colorOption = item.options.find(option => option.name.toLowerCase() === 'color');
    if (colorOption) {
      return colorOption.value;
    }
    return '';
  }

  getItemSize(item: OnlineArticle) {
    const sizeOption = item.options.find(option => option.name.toLowerCase() === 'size');
    if (sizeOption) {
      return sizeOption.value;
    }
    return '';
  }

  calculateBilling(cart: Cart) {
    //change multi country frontier
    cart.tax = 19.6;
    cart.subTotal = 0;
    cart.total = 0;
    cart.onlineArticles.forEach(onlineArticle => {
      let articlePrice = parseInt(onlineArticle.price) * onlineArticle.countOnBuy;
      // add vat from store      
      cart.subTotal = cart.subTotal + articlePrice;
      let articleTaxes = articlePrice * (0.196) + articlePrice;
      cart.total = round(cart.total + articleTaxes);
    });
    return cart;
  }

  aggregateArticle(article: OnlineArticle, cart: Cart){
    let isDuplicated: number = 0;
    cart.onlineArticles.forEach(articleOnline => {
      if (articleOnline.id == article.id && 
        articleOnline.itemId == article.itemId &&
        articleOnline.refStoreId == article.refStoreId) {
        if (articleOnline.countOnBuy < articleOnline.totalStock) {
          articleOnline.countOnBuy = articleOnline.countOnBuy + 1; 
          isDuplicated = 1;
        }
      }
    });

    if (isDuplicated == 0) {
      cart.onlineArticles.push(article);
      return cart;
    }
    return cart;
  }

  plus(index) {
    let actualCount = this.cart.onlineArticles[index]['countOnBuy'];
    let totalCount = this.cart.onlineArticles[index]['totalStock'];
    if (actualCount < totalCount) {
      this.cart.onlineArticles[index]['countOnBuy'] ++;
      this.cart = this.calculateBilling(this.cart);
      this.cart.subTotal = parseInt(this.cart.subTotal.toFixed(1));
      this.countsChanged = true;
    }
  }
  minus(index) {
    if(this.cart.onlineArticles[index]['countOnBuy'] > 1){
      this.cart.onlineArticles[index]['countOnBuy'] --;
      this.cart = this.calculateBilling(this.cart);
      this.cart.subTotal = parseInt(this.cart.subTotal.toFixed(1));
      this.countsChanged = true;
    }
  }

  async ngOnDestroy() {
     if (this.countsChanged == true) {
       let updateRequest = <CartRequest>{
         country: "France",
         cart: this.cart
       };
      
       this.cart.subTotal = parseInt(this.cart.subTotal.toFixed(1));
       (await this.cartClient.Update(updateRequest)).subscribe((cart) => {
       });
     }
      if(this.cartSubscription){
        this.cartSubscription.unsubscribe();

      }
      this.cartService.changeCartArticle(null);
  }

  async remove(index){
    this.cart.onlineArticles.splice(index, 1);
    this.cart = this.calculateBilling(this.cart);
    this.cart.subTotal = parseInt(this.cart.subTotal.toFixed(1));
    let updateRequest = <CartRequest>{
      country: "France",
      cart: this.cart
    };

    (await this.cartClient.Update(updateRequest)).subscribe((cart) => {
    });
  }

  checkout() {
    this.cartService.changeCartCheckout(this.cart);
    let checkoutRoute = '/my-orders/checkout';
    this.router.navigate([checkoutRoute]);
  }
}
