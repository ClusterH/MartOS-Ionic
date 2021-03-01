import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Environment } from '@ionic-native/google-maps';
import { AuthLogin } from './core/auth.login';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { AppService } from './services/AppService';
import { NavigationEnd, Router } from '@angular/router';
import { SignalRService } from './services/SignalRService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit {

  isFollowOrder: boolean = false;
  isDriver: boolean = false;
  hometabs: boolean = false;


  constructor(
    private signalRService: SignalRService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authLogin: AuthLogin,
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private appService: AppService,
    private backgroundGeolocation: BackgroundGeolocation,
    private router: Router
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.hometabs = (['home', 'search'].indexOf(event.url) > -1)
        }
      });
  }

  ngOnDestroy() {
    this.backgroundGeolocation.stop();
    // ios plateform
    this.backgroundGeolocation.finish();
  }

  async initializeApp() {
    await this.signalRService.init();
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    const token = await this.authLogin.getToken();

    if (token != null && token !== undefined) {
      this.navCtrl.navigateRoot('/tabs/home');
    }
  }

  changeDriver() {
    this.isDriver = true;
    this.isFollowOrder = false;
  }
}
