import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OnlineArticle } from 'src/app/models/OnlineArticle';
import { AddArticleToListRequest, GetShoppingListRequest, ShoppingList, ShoppingListType } from '../models/shopping-list.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit, OnDestroy {
  article: OnlineArticle;
  lists: ShoppingList[] = [];
  createdSubscription: Subscription;

  constructor(private navCtrl: NavController, private router: Router, private shoppingListService: ShoppingListService) { }

  async ngOnInit() {

    this.createdSubscription = this.shoppingListService.currentShoppingList.subscribe(async newShoppingList => {
      if (!newShoppingList || newShoppingList == null) {
        return;
      }
      
      this.lists.push(newShoppingList);
    });

    this.shoppingListService.activeArticle.subscribe((next: OnlineArticle) => {
      this.article = { ...next };
    });

    const req: GetShoppingListRequest = {
      country: 'France',
    };

    return new Promise(async (resolve) => {
    (await this.shoppingListService.getShoppingLists(req)).subscribe((next: ShoppingList[]) => {
      resolve(next)
      this.lists = next;
    });    
  });
  }

  backClicked() {
    this.navCtrl.back();
  }

  createList() {
    this.router.navigateByUrl('tabs/shoppinglist/create-list');
  }

  async addArticleToList(event: ShoppingList) {
    const request: AddArticleToListRequest = { country: 'France', id: event.id, type: event.type, onlineArticle: this.article };
    (await this.shoppingListService.addArticleToList(request)).subscribe(next => {
      console.log({ next });
    });
    
    this.navCtrl.navigateRoot('/tabs/home');
  }

  ngOnDestroy() {
    if (this.createdSubscription) {
      this.createdSubscription.unsubscribe();
    }
    
    this.shoppingListService.changeShoppingList(null);
  }
}
