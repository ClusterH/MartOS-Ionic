import { IonicModule } from '@ionic/angular';
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category/sub-category.component';


@NgModule({
  declarations: [CategoriesComponent, SubCategoryComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [CategoriesComponent, SubCategoryComponent]
})
export class CategoriesModule { }
