import { CategoriesModule } from './../components/categories/categories.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyOrdersComponent } from './my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { IonicRatingModule } from 'ionic-rating';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddCardComponent } from './checkout/add-card/add-card.component';
import { ShippingComponent } from './checkout/shipping/shipping.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from '../core/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyOrdersComponent
  },
  {
    path: 'review/:id',
    component: OrderReviewComponent
  },
  {
    path: 'checkout',
    pathMatch: 'full',
    component: CheckoutComponent
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':id',
    pathMatch: '',
    component: OrderDetailsComponent
  }
];


@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderDetailsComponent,
    AddCardComponent,
    OrderReviewComponent,
    CheckoutComponent,
    ShippingComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    CategoriesModule,
    SharedModule,
    IonicRatingModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
  ]
})
export class MyOrdersModule { }
