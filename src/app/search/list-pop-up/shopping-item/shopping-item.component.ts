import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingList, ShoppingListType, SingleShoppingList } from '../../../shopping-list/models/shopping-list.model';
import { Location } from '../../../models/Location';
import { ModalController } from '@ionic/angular';
;
@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {
  @Input() item: ShoppingList;
  @Input() viewCtrl: ModalController;
  @Output() showMarker:EventEmitter<any> = new EventEmitter<any>();

  shoppingListType = ShoppingListType;
  currentItem: ShoppingList;
  locations: Location[] = [];
  req: SingleShoppingList;
  constructor() { }

  ngOnInit() {
  }
  async goToLocation() {
    this.showMarker.emit(this.item.id)
  }
}
