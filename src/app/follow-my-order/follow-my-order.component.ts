import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-follow-my-order',
  templateUrl: './follow-my-order.component.html',
  styleUrls: ['./follow-my-order.component.scss'],
})
export class FollowMyOrderComponent implements OnInit {
  orders: Array<any> = [

  ];

  constructor() { }

  ngOnInit() {
    this.fillOrders();
  }

  fillOrders() {
    this.orders = [
      {
        id: "1",
        total: "123",
        image: '../../assets/images/arrivals-2.png',
        deliveryDate: 'OCT 12th 2019',
        orderDate: 'OCT 12th 2019',
        items: [],
        review: {
          id: 12,
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
          rating: 3
        }
      },
      {
        id: "123",
        total: "123",
        image: '../../assets/images/arrivals-2.png',
        deliveryDate: 'OCT 12th 2019',
        orderDate: 'OCT 12th 2019',
        items: []
      },
      {
        id: "124",
        total: "123",
        image: '../../assets/images/arrivals-2.png',
        deliveryDate: 'OCT 12th 2019',
        orderDate: 'OCT 12th 2019',
        items: []
      },
      {
        id: "134",
        total: "123",
        image: '../../assets/images/arrivals-2.png',
        deliveryDate: 'OCT 12th 2019',
        orderDate: 'OCT 12th 2019',
        items: []
      },
      {
        id: "123",
        total: "123",
        image: '../../assets/images/arrivals-2.png',
        deliveryDate: 'OCT 12th 2019',
        orderDate: 'OCT 12th 2019',
        items: []
      }
    ]
  }

  follow(){
  }

}
