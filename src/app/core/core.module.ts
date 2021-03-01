import { Requestor, StorageBackend } from '@openid/appauth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { browserFactory, storageFactory, httpFactory } from './factories';
import { Browser } from 'ionic-appauth';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  imports: [
    CommonModule,
  //  IonicStorageModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: StorageBackend,
    //   useFactory: storageFactory,
    //   deps: [Platform]
    // },
    // {
    //   provide: Requestor,
    //   useFactory: httpFactory,
    //   deps: [Platform, HttpClient]
    // },
    // {
    //   provide: Browser,
    //   useFactory : browserFactory,
    //   deps: [Platform]
    // }
  ]
})
export class CoreModule { }
