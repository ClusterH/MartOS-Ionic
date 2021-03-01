import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';
import { ProductTypesPageRoutingModule } from './productTypes-routing.module';
import { ProductTypesPage } from './productTypes.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ProductTypesPage }]),
    ProductTypesPageRoutingModule,
  ],
  declarations: [ProductTypesPage]
})
export class ProductTypesPageModule {}
