import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CategoriesModule } from './../components/categories/categories.module';
import { MapViewPageModule } from '../components/mapView/mapView.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'search',
    pathMatch: 'full',
    component: SearchComponent
  },
];

@NgModule({
  declarations: [HomeComponent,SearchComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CategoriesModule,
    RouterModule.forChild(routes),
    IonBottomDrawerModule,
    MapViewPageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent, SearchComponent]
})
export class HomeModule { }
