import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTypesPage } from './productTypes.page';

const routes: Routes = [
  {
    path: '',
    component: ProductTypesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTypesPageRoutingModule {}
