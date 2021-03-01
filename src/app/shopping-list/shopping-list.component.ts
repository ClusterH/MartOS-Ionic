import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  segmentModel = 'shoppinglists';
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  backClicked() {
    this.navCtrl.back();
  }
}
