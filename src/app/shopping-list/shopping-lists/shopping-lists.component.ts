import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetShoppingListRequest, ShoppingList, ShoppingListType } from '../models/shopping-list.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.scss']
})
export class ShoppingListsComponent implements OnInit, OnDestroy {
  lists: ShoppingList[] = [];
  createdSubscription: Subscription;
  updatedSubscription: Subscription;
  constructor(private router: Router, private shoppingListService: ShoppingListService) { }

  async ngOnInit() {
    this.createdSubscription = this.shoppingListService.currentShoppingList.subscribe(async newShoppingList => {
      if (!newShoppingList || newShoppingList == null) {
        return;
      }
      
      this.lists.push(newShoppingList);
    });

    this.updatedSubscription = this.shoppingListService.currentUpdatedShoppingList.subscribe(async updatedShoppingList => {
      if (!updatedShoppingList || updatedShoppingList == null) {
        return;
      }

      this.lists.forEach(list => {
        if (list.id == updatedShoppingList.id) {
          list.name = updatedShoppingList.name;
          list.type = updatedShoppingList.type
        }
      });
    });

    const req: GetShoppingListRequest = {
      country: 'France',
    };

    return new Promise(async (resolve) => {
    (await this.shoppingListService.getShoppingLists(req)).subscribe((next: ShoppingList[]) => {
      resolve(next);
      this.lists = next;
    });
  });
  }

  async ionViewDidEnter (){
    console.log('view enter')
    const req: GetShoppingListRequest = {
      country: 'France',
    };

    return new Promise(async (resolve) => {
    (await this.shoppingListService.getShoppingLists(req)).subscribe((next: ShoppingList[]) => {
      resolve(next);
      this.lists = next;
      });
    });
  }

  createList() {
    this.router.navigateByUrl('tabs/shoppinglist/create-list');
  }

  ngOnDestroy() {
    if (this.createdSubscription) {
      this.createdSubscription.unsubscribe();
    }

    if (this.updatedSubscription) {
      this.updatedSubscription.unsubscribe();
    }
    
    this.shoppingListService.changeShoppingList(null);
    this.shoppingListService.changeUpdatedShoppingList(null);
  }
}
