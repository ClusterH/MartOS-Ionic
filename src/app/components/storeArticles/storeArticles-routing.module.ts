import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreArticlesPage } from './storeArticles.page';

const routes: Routes = [
  {
    path: '',
    component: StoreArticlesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreArticlesRoutingModule {}
