import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeliveryOrdersClient } from '../../my-orders/checkout/clients/DeliveryOrdersClient';
import { DeliveryExistRequest } from '../../requests/DeliveryExistRequest';
import { DeliveryOrdersService } from '../../services/DeliveryOrdersService';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit, OnDestroy {
  public newOrder = false;
  deliveryExistSubscription: Subscription;

  constructor(private deliveryOrdersClient: DeliveryOrdersClient,
    private deliveryOrdersService: DeliveryOrdersService) { }

  async ngOnInit() {
    this.deliveryExistSubscription = this.deliveryOrdersService.currentDeliveryExist.subscribe(response => {
      if (!response) {
        return;
      }
      
      this.newOrder = response.exist;
    });
    
    let request = <DeliveryExistRequest> {
      country: "France"
    };
    
    return new Promise(async (resolve) => {
    (await this.deliveryOrdersClient.CurrentOrderExist(request)).subscribe(response => {
      resolve(response);
      this.newOrder = response.exist;
    });
  });
  }


  ngOnDestroy() {
    if(this.deliveryExistSubscription){
      this.deliveryExistSubscription.unsubscribe();
    }

    this.deliveryOrdersService.changeDeliveryExistResponse(null);
  }
}
