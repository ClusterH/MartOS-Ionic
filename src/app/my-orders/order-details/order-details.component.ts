import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrdersClient } from '../checkout/clients/OrdersClient';
import { GetOrderRequest } from '../../requests/GetOrderRequest';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  orderId: string;
  order: Order;
 
  constructor(private router: ActivatedRoute,
    private ordersClient: OrdersClient) {
    router.params.subscribe(p=> {
      this.orderId = p.id
    })
  }

  async ngOnInit() {
    let request = <GetOrderRequest>{
      country: "France",
      orderId: this.orderId
    };
    
    this.order = <Order> {
      articles: []
    };

    return new Promise(async (resolve) => {
    (await this.ordersClient.GetById(request)).subscribe(detail => {
      resolve(detail);
      this.order = detail;
      this.order.image = '../../assets/images/dummy-profil.png';
    });
    });
   }
}
