import { Component, Input, OnInit } from '@angular/core';
import { OnlineArticle } from 'src/app/models/OnlineArticle';

@Component({
  selector: 'app-pick-up-item',
  templateUrl: './pick-up-item.component.html',
  styleUrls: ['./pick-up-item.component.scss']
})
export class PickUpItemComponent implements OnInit {
  @Input() article: OnlineArticle;
  constructor() { }

  ngOnInit() {
  }

}
