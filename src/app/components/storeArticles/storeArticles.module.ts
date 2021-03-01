import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreArticlesRoutingModule } from './storeArticles-routing.module'
import { StoreArticlesPage } from './storeArticles.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: StoreArticlesPage }]),
    StoreArticlesRoutingModule,
  ],
  declarations: [StoreArticlesPage]
})
export class StoreArticlesModule {}
