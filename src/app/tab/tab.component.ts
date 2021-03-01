import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  @ViewChild('tabs') tabs: IonTabs;
  constructor(private navCtrl: NavController) { }

  ngOnInit() { }


  async openTab(tab: string, evt: MouseEvent) {
    const tabSelected = this.tabs.getSelected();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    return tabSelected !== tab
      ? await this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
      : this.tabs.select(tab);
  }
}
