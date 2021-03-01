import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-pop-up',
  templateUrl: './item-pop-up.component.html',
  styleUrls: ['./item-pop-up.component.scss']
})
export class ItemPopUpComponent implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data

    this.viewCtrl.dismiss({
      'dismissed': true
        });
  }

}
