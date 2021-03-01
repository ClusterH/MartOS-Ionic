import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { ShoppingListsComponent } from './shopping-lists/shopping-lists.component';
import { ShoppingListItemComponent } from './shopping-lists/shopping-list-item/shopping-list-item.component';
import { ListArticleComponent } from './favorites/list-article/list-article.component';
import { CreateEditListComponent } from './create-edit-list/create-edit-list.component';
import { ViewListComponent } from './view-list/view-list.component';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { ShoppingListAddItemComponent } from './add-to-list/shopping-list-add-item/shopping-list-add-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShoppingListComponent
  },
  {
    path: 'create-list',
    component: CreateEditListComponent
  },
  {
    path: 'update-list/:id',
    component: CreateEditListComponent
  },
  {
    path: 'view-list/:id',
    component: ViewListComponent
  },
  {
    path: 'add-to-list/:id',
    component: AddToListComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ShoppingListComponent,
    FavoritesComponent,
    ShoppingListsComponent,
    ShoppingListItemComponent,
    ListArticleComponent,
    CreateEditListComponent,
    ViewListComponent,
    AddToListComponent,
    ShoppingListAddItemComponent
  ]
})
export class ShoppingListModule { }
