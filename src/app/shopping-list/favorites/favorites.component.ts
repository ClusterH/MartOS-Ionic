import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineArticle } from 'src/app/models/OnlineArticle';
import { GetShoppingListRequest, RemoveShoppingListRequest, ShoppingList, ShoppingListType } from '../models/shopping-list.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  list: ShoppingList;
  constructor(private shoppingListService: ShoppingListService, private router: Router) { }

  async ngOnInit() {
    const req: GetShoppingListRequest = {
      country: 'France',
    };
    
    return new Promise(async (resolve) => {
    (await this.shoppingListService.getFavorites(req)).subscribe((next: ShoppingList) => {
      resolve(next);
      this.list = next;
    });
  });
  }

  addToList(event: OnlineArticle) {
    this.shoppingListService.activeArticle.next(event);
    this.router.navigateByUrl('tabs/shoppinglist/add-to-list/' + event.id);
  }

  async deleteArticle(event: OnlineArticle) {
    const request: RemoveShoppingListRequest = {
      country: 'France',
      itemId: event.itemId,
      articleId: event.id,
      refStoreId: event.refStoreId,
      id: this.list.id,
      type: this.list.type,
    };

    (await this.shoppingListService.removeArticleFromList(request)).subscribe(next => {
      console.log('delete')
      const oldArticleIndex = this.list.onlineArticles.findIndex(x => x.id === event.id)
      this.list.onlineArticles.splice(oldArticleIndex, 1);
    })
  }

}
