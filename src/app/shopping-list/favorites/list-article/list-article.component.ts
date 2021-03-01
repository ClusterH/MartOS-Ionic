import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineArticle } from 'src/app/models/OnlineArticle';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  @Input() article: OnlineArticle;
  @Output() addTolist: EventEmitter<OnlineArticle> = new EventEmitter<OnlineArticle>();
  @Output() delete: EventEmitter<OnlineArticle> = new EventEmitter<OnlineArticle>();
  @Input() disableButtons = false;
  constructor() { }

  ngOnInit() {
  }

  addTo() {
    console.log(this.article)
    this.addTolist.emit(this.article);
  }
  deleteArticle(){
    this.delete.emit(this.article);
  }

}
