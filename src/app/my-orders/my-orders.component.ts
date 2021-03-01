import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';
import { OrderInfo } from '../models/OrderInfo';
import { GetAllOrdersRequest } from '../requests/GetAllOrdersRequest';
import { OrdersClient } from './checkout/clients/OrdersClient';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {

  orderInfos: OrderInfo[] = [];
  constructor(private ordersClient: OrdersClient) { }

  async ngOnInit() {
    return new Promise(async (resolve) => {
        let request = <GetAllOrdersRequest>
        {
          country: "France"
        };
        
        (await this.ordersClient.GetInfos(request)).subscribe(orders => {
          resolve(orders);
          this.orderInfos = orders;
        });
      });
  }
}
