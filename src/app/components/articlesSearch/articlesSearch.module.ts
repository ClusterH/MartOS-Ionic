import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticlesSearchPageRoutingModule } from './articlesSearch-routing.module';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ArticlesSearchPage } from './articlesSearch.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ArticlesSearchPageRoutingModule
  ],
  declarations: [ArticlesSearchPage]
})
export class ArticlesSearchPageModule {}
