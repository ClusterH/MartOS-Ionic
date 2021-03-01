import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnlineArticle } from '../../models/OnlineArticle';
import { Cart } from '../../models/Cart';
import { CheckoutService } from './services/CheckoutService';
import { CartService } from '../../services/CartService';
import { OrdersClient } from './clients/OrdersClient';
import { OrderRequest } from '../../requests/OrderRequest';
import { OrderProcess } from '../../models/OrderProcess';
import { OrderType } from '../../models/OrderType';
import { AddressService } from '../../address/services/AddressService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  count: number = 1;
  subTotal: number;
  total: number;
  tax: number;
  cart: Cart;
  articlesToKeep: OnlineArticle[] = [];
  form: FormGroup;
  deliverySubscription: Subscription;
  shippingAddressSubscription: Subscription;
  billingAddressSubscription: Subscription;

  constructor(
    private checkoutService: CheckoutService,
    private ordersClient: OrdersClient,
    private cartService: CartService,
    public router: Router,
    private addressService: AddressService 
  ) {}
  
  async ngOnInit() {

    this.cartService.currentCartCheckout.subscribe(cart => {
        this.cart = cart;
        console.log(this.cart)
    });

    this.tax = this.cart.tax;
    this.calculateTotals();
      this.form = new FormGroup({
        shippingAddress: new FormControl(null, Validators.required),
        billingAddress: new FormControl(null, Validators.required),
        payment: new FormControl('1234 1234 1234 1234', Validators.required),
        delivery: new FormControl('pickup', Validators.required),
      });

    this.deliverySubscription = this.checkoutService.delivery.subscribe(
      (next) => {
        this.form.get('delivery').setValue(next);
      }
    );

    this.shippingAddressSubscription = this.checkoutService.defaultShippingAddress.subscribe(
      (next) => {
        console.log({ next });
        this.form.get('shippingAddress').setValue(next);
        console.log(this.form.get('shippingAddress').value);
      }
    );

    this.billingAddressSubscription = this.checkoutService.defaultbillingAddress.subscribe(
      (next) => {
        console.log({ next });
        this.form.get('billingAddress').setValue(next);
      }
    );
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
    return 'Unique size';
  }

  plus(index) {
    this.cart.onlineArticles[index]['count']++;
    this.calculateTotals();
  }

  minus(index) {
    if (this.cart.onlineArticles[index]['count'] > 1) {
      this.cart.onlineArticles[index]['count']--;
    }
    this.calculateTotals();
  }

  remove(index) {
    this.articlesToKeep.push(this.cart.onlineArticles[index]);
    this.cart.onlineArticles.splice(index, 1);
  }

  calculateTotals() {
    this.subTotal = 0;
    this.total = 0;
    if (this.cart && this.cart.onlineArticles) {
      this.cart.onlineArticles.forEach((item) => {
        this.subTotal = this.subTotal + Number(item.price) * item.countOnBuy;
      });
    }
    this.total = this.subTotal + this.tax;
  }

  changeAddress(address, mod) {
    this.router.navigateByUrl(
      './address/' + (address ? 'change/' : 'add/' + mod)
    );
  }

  async checkout() {
    let orderType;
    if (this.form.get('delivery').value == "pickup") {
      orderType = OrderType.PickUpInStore
    } else {
      orderType = OrderType.Delivery
    } 
    // delete when radio button is fixed
    orderType = OrderType.Delivery
    let orderProcess = <OrderProcess>{
      VAT : this.tax,
      country : "France",
      price : this.cart.total,
      articles : this.cart.onlineArticles,
      orderType : orderType,
      address : this.addressService.currentAddress,
      user: this.addressService.userInfo
    };
    
    let request = <OrderRequest> {
      country: "France",
      order: orderProcess
    };

    console.log('cart:', this.cart);
    console.log('other info:', this.form.value);

    return new Promise(async (resolve) => {
    (await this.ordersClient.CreateOrder(request)).subscribe(onlineOrder => {
      resolve(onlineOrder);
    });
  });
  }

  ngOnDestroy() {
    if (this.deliverySubscription) {
      this.deliverySubscription.unsubscribe();
    }
  }
}
