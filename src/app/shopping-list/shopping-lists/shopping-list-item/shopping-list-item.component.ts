import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingList, ShoppingListType, SingleShoppingList } from '../../models/shopping-list.model';
import { Location } from '../../../models/Location';
import { MapsService } from '../../../services/MapsService';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent implements OnInit {
  shoppingListType = ShoppingListType;
  @Input() item: ShoppingList;
  currentItem: ShoppingList;
  locations: Location[] = [];
  req: SingleShoppingList;
  constructor(private router: Router,
    private mapsService : MapsService,
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  viewList() {
    this.router.navigateByUrl('tabs/shoppinglist/view-list/' + this.item.id);
  }

  async goToLocation(event) {
    event.stopPropagation();
    console.log(this.item);
    this.req = {
      country: 'France',
      id: this.item.id
    };

    (await this.shoppingListService.getListByid(this.req)).subscribe((data: ShoppingList) => {
      this.currentItem = data;

      this.currentItem.onlineArticles.forEach(article =>{
      this.locations.push(article.location);
       });

       this.mapsService.changeGoListLocation(data, this.locations,true);
       let mapRoute = '/tabs/shopnearby';
       this.router.navigate([mapRoute]);
      });
  }
}
