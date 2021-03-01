import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapViewPageModule } from '../components/mapView/mapView.module';

import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { ProductDetailModule } from '../product-details/product-detail/product-detail.module';
import { ProductService } from '../services/ProductService';
import { ItemPopUpComponent } from './item-pop-up/item-pop-up.component';
import { ShoppingItemComponent } from './list-pop-up/shopping-item/shopping-item.component';
import { PickUpItemComponent } from './list-pop-up/pick-up-item/pick-up-item.component';
import { ListPopUpComponent } from './list-pop-up/list-pop-up.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
]

@NgModule({
  declarations: [
    SearchComponent,
    DrawerComponent,
    ItemPopUpComponent,
    ListPopUpComponent,
    ShoppingItemComponent,
    PickUpItemComponent
  ],
  imports: [
    IonicModule.forRoot(),
    MapViewPageModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonBottomDrawerModule,
    ProductDetailModule
  ],
  providers: [ProductService]
})
export class SearchModule { }
