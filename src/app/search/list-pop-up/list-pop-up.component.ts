import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingList, ShoppingListType } from 'src/app/shopping-list/models/shopping-list.model';
import { GetShoppingListRequest } from '../../shopping-list/models/shopping-list.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-list-pop-up',
  templateUrl: './list-pop-up.component.html',
  styleUrls: ['./list-pop-up.component.scss']
})
export class ListPopUpComponent implements OnInit {
  list: ShoppingList[] = [
    {
      id: '1', name: 'My shopping list 1', productsCount: 3, type: ShoppingListType.NotPermanent, onlineArticles: [
        {
          id: 1,
          itemId: 0,
          refStoreId: '',
          totalStock: 2,
          countOnBuy: 7,
          name: 'T-shirt uni en coton BIO orange',
          price: '124',
          urls: [],
          image: '../../../../assets/images/arrivals-4.png',
          vat: 10,
          options: [{ name: 'color', value: 'orange' }, { name: 'size', value: '38' }],
        },
        {
          id: 2,
          itemId: 0,
          refStoreId: '',
          totalStock: 0,
          countOnBuy: 7,
          name: 'T-shirt uni en coton BIO orange',
          price: '124',
          urls: [],
          image: '../../../../assets/images/arrivals-4.png',
          vat: 10,
          options: [{ name: 'color', value: 'orange' }, { name: 'size', value: '38' }],
        }
      ]
    },
    {
      id: '2', name: 'My shopping list 2', productsCount: 5, type: ShoppingListType.Permanent, onlineArticles: [
        {
          id: 0,
          itemId: 0,
          refStoreId: '',
          totalStock: 2,
          countOnBuy: 7,
          name: 'T-shirt uni en coton BIO orange',
          price: '124',
          urls: [],
          image: '../../../../assets/images/arrivals-4.png',
          vat: 10,
          options: [{ name: 'color', value: 'orange' }, { name: 'size', value: '38' }],
        },
        {
          id: 0,
          itemId: 0,
          refStoreId: '',
          totalStock: 10,
          countOnBuy: 7,
          name: 'T-shirt uni en coton BIO orange',
          price: '124',
          urls: [],
          image: '../../../../assets/images/arrivals-4.png',
          vat: 10,
          options: [{ name: 'color', value: 'orange' }, { name: 'size', value: '38' }],
        }
      ]
    },
    {
      id: '3', name: 'My shopping list 3', productsCount: 0, type: ShoppingListType.NotPermanent, onlineArticles: [
        {
          id: 0,
          itemId: 0,
          refStoreId: '',
          totalStock: 2,
          countOnBuy: 7,
          name: 'T-shirt uni en coton BIO orange',
          price: '124',
          urls: [],
          image: '../../../../assets/images/arrivals-4.png',
          vat: 10,
          options: [{ name: 'color', value: 'orange' }, { name: 'size', value: '38' }],
        },
        {
          id: 0,
          itemId: 0,
          refStoreId: '',
          totalStock: 10,
          countOnBuy: 7,
          name: 'T-shirt uni en coton BIO orange',
          price: '124',
          urls: [],
          image: '../../../../assets/images/arrivals-4.png',
          vat: 10,
          options: [{ name: 'color', value: 'orange' }, { name: 'size', value: '38' }],
        }
      ]
    },
  ];
  lists:ShoppingList[]=[]
  constructor(public viewCtrl: ModalController,private shoppingListService: ShoppingListService) { }

  async ngOnInit() {
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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.viewCtrl.dismiss({
      'dismissed': true
    });
  }

  dismissMArker(id){
    this.viewCtrl.dismiss({
      'dismissed':true,
      'id':id
    })
  }
}
