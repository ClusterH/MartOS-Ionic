import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnInit {

  order: any = {
    id: "1234",
    total: "154",
    image: '../../assets/images/arrivals-2.png',
    deliveryDate: 'OCT 12th 2019',
    orderDate: 'OCT 12th 2019',
    subTotal: 123,
    tax: 12,
    deliveryMode: 'Pick Up',
    shippingAddres: '128 asd asd',
    payment: {
      cardNumber: 'XXXX XXXX XXXX 1234',
      expiryDate: '17 / 23',
      cardType: 'Visa',
      cardHolderName: 'Jane'
    },
    items: [
      {
        itemName: "T-Shirt",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/arrivals-2.png",
        size: 38
      },
      {
        itemName: "T-Shirt",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/arrivals-2.png",
        size: 38
      },
      {
        itemName: "T-Shirt",
        quantity: 1,
        price: 123,
        color: "Orange",
        image: "../../assets/images/arrivals-2.png",
        size: 38
      }
    ],
    review: {
      id: 12,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      rating: 3
    }
  }

  reviewRating: number =  2;
  isSubmitted: boolean = false;
  rcontent: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res=>{
      if(this.order.review && this.order.review.rating && res.id == '1'){
        this.reviewRating  = this.order.review.rating;
        this.isSubmitted = true;
        this.rcontent = this.order.review.comment;
      }
    })

  }

  onRateChange(numb) {
    this.reviewRating = numb;
  }

  addReview() {
    this.isSubmitted = true;
  }

  content(e){
    this.rcontent = e.target.value;
  }
}
