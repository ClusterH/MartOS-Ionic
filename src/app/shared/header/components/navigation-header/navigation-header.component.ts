import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent implements OnInit {
  @Input('label') label: string;

  constructor(private location: Location, private router: Router, private navCtrl: NavController) { }

  backClicked() {
    this.navCtrl.back();
  }

  ngOnInit() {
  }

}
