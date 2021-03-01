import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingList, ShoppingListType } from '../../models/shopping-list.model';

@Component({
  selector: 'app-shopping-list-add-item',
  templateUrl: './shopping-list-add-item.component.html',
  styleUrls: ['./shopping-list-add-item.component.scss']
})
export class ShoppingListAddItemComponent implements OnInit {
  @Input() item: ShoppingList;
  @Output() addToList: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();

  shoppingListType = ShoppingListType;
  constructor() { }

  ngOnInit() {
  }

  sendAddRequest() {
    this.addToList.emit(this.item);
  }
}
