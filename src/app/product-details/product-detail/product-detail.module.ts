import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductService } from 'src/app/services/ProductService';
import { AutofocusDirective } from 'src/app/shared/directives/auto-focus.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { ProductDetailsComponent } from '../product-details.component';
import { OptionDynamicComponent } from '../product-options/option-dynamic/option-dynamic.component';
import { ProductOptionsComponent } from '../product-options/product-options.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@NgModule({
  declarations: [ProductDetailComponent, OptionDynamicComponent, ProductOptionsComponent, ProductDescriptionComponent, ProductReviewsComponent],
  exports: [NgxSpinnerModule, AutofocusDirective, OptionDynamicComponent, ProductDetailComponent],
  imports: [
    IonicModule,
    SharedModule,
    CommonModule
  ],
  providers: [ProductService]
})
export class ProductDetailModule { }
