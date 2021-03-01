import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';
import { CategoriesPage } from './categories.page';
import { CategoriesRoutingModule } from './categories-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: CategoriesPage }]),
    CategoriesRoutingModule,
  ],
  declarations: [CategoriesPage]
})
export class CategoriesModule {}
