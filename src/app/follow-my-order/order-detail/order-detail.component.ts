import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  isPanel: boolean = false;
  currentState: string = 'Order Confirmed';
  currentStat: number = 0;
  order: any = {
    id: "1234",
    total: "154",
    image: '../../assets/images/arrivals-2.png',
    deliveryTime: '25 minutes',
    orderDate: 'OCT 12th 2019',
    subTotal: 123,
    tax: 12,
    deliveryMode: 'Pick Up',
    shippingAddres: '11 rue de rivoli, 75001 Paris',
    time: "10 AM - 6 PM",
    phone: "21 123 12312",
    status: false,
    deliveryType: 'Pick Up In Store',
    items: [
      {
        itemName: "T-shirt uni en coton BIO orange",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/items.png",
        size: 38
      },
      {
        itemName: "T-Shirt",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/items.png",
        size: 38
      },
      {
        itemName: "T-Shirt",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/items.png",
        size: 38
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

  tooglePanel(){
    this.isPanel = !this.isPanel;
  }

  changeCurrentState(state, num) {
    this.currentState = state;
    this.currentStat = num;
  }
}
