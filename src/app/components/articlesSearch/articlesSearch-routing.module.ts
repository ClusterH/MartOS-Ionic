import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesSearchPage } from './articlesSearch.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesSearchPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesSearchPageRoutingModule {}
