import { ImageSliderModule } from './image-slider/image-slider.module';
// include directives/components commonly used in features modules in this shared modules
// and import me into the feature module
// importing them individually results in: Type xxx is part of the declarations of 2 modules: ... Please consider moving to a higher module...
// https://github.com/angular/angular/issues/10646

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { HeaderModule } from './header/header.module';
import { ItemCardComponent } from './item-card/item-card.component';
import { OverflowableComponent } from './overflowable/overflowable.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';

//https://stackoverflow.com/questions/41433766/directive-doesnt-work-in-a-sub-module
//https://stackoverflow.com/questions/45032043/uncaught-error-unexpected-module-formsmodule-declared-by-the-module-appmodul/45032201

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ImageSliderModule,
    HeaderModule,
    RouterModule,
    NgxSpinnerModule],
  declarations: [NewOrderComponent,AutofocusDirective, ItemCardComponent, OverflowableComponent, SidebarComponent, OrderPreviewComponent],
  exports: [NewOrderComponent,NgxSpinnerModule, AutofocusDirective, HeaderModule, ImageSliderModule, ItemCardComponent, OverflowableComponent, SidebarComponent, OrderPreviewComponent],
  entryComponents: [ItemCardComponent],
  providers: []
})
export class SharedModule { }
