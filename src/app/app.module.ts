import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesClient } from './clients/ArticlesClient';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/ConfigService';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { TabComponent } from './tab/tab.component';
import { HomeComponent } from './home/home.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: false
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    ArticlesClient,
    LocationAccuracy,
    Geolocation,
    Diagnostic,
    BackgroundGeolocation,
    AndroidPermissions,
    ConfigService,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule { }
