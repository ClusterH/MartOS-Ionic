import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsDetailService } from '../../services/ProductsDetailService';
import { GetByItemIdRequest } from '../../requests/GetByItemIdRequest';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() disableClick = false;
  @Output() selectedItemRequest: EventEmitter<any> = new EventEmitter<any>();
  @Input('item') item: any = {}
  private readonly productsDetailService: ProductsDetailService;
  constructor(private router: Router,
    productsDetailService: ProductsDetailService) {
    this.productsDetailService = productsDetailService;
  }

  ngOnInit() {

  }

  getItemDetails(item: any) {
    var request = <GetByItemIdRequest>{
      ReferenceStoreId: item.storeId,
      ItemId: item.itemId,
      country: item.country
    };

    this.productsDetailService.changeActualOptions(null)
    this.productsDetailService.changeDetailRequest(request);
    if (this.disableClick) {
      this.selectedItemRequest.emit(request);
    } else {
      this.router.navigateByUrl('/details')
    }

  }
}
