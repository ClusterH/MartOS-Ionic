import { ProductService } from './../services/ProductService';
import { IonicModule } from '@ionic/angular';
import { ProductDetailsComponent } from './product-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductDetailsComponent
  },
];



@NgModule({
  declarations: [ProductDetailsComponent],
  exports: [],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule,
    ProductDetailModule,
    SharedModule
  ],
  providers: []
})
export class ProductDetailsModule { }
