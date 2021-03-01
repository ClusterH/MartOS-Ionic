import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapViewPageModule } from '../components/mapView/mapView.module';
import { CategoriesModule } from './../components/categories/categories.module';

import { ShopComponent } from './shop.component';
import { ShopCategoriesComponent } from './shopcategories/shopcategories.component';

const routes : Routes = [
  {
    path: ":id",
    component: ShopComponent
  }
]

@NgModule({
  declarations: [ShopComponent,ShopCategoriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    CategoriesModule,
    MapViewPageModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ShopModule { }
