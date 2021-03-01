import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticlesPage } from './articles.page';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ArticlesPage }]),
    ArticlesRoutingModule,
  ],
  declarations: [ArticlesPage]
})
export class ArticlesModule {}
