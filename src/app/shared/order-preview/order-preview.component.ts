import { Component, OnInit, Input } from '@angular/core';
import { Order} from '../../models/Order';

@Component({
  selector: 'order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.scss'],
})
export class OrderPreviewComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit() {}

}
