import { CategoriesModule } from './../components/categories/categories.module';
import { IonicModule } from '@ionic/angular';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoryComponent
  }
];


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoriesModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule { }
