import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallbackService } from '../../core/callback.service';
import { Storage } from '@ionic/storage';
import { AuthHttpService } from '../../core/auth-http.service';
import { TokenRequest } from '../../requests/TokenRequest';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  template: '<p>Signing in...</p>'
})
export class AuthCallbackPage implements OnInit, OnDestroy {
  callBackUrl: string;
  codeChallenge: string;

  callbackUrlSubscription: Subscription;
  codeChallengeSubscription: Subscription;

  private readonly callBackService: CallbackService;
  private readonly router: Router;
  constructor(
    private auth: AuthHttpService,
    router: Router,
    callBackService: CallbackService,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.callBackService = callBackService;
    this.router = router;
  }

  ionViewWillEnter() {
    this.callbackUrlSubscription = this.callBackService.currentCurrentCallbackUrl.subscribe(val => {
      this.callBackUrl = val
    });

    this.codeChallengeSubscription = this.callBackService.currentCodeChallenge.subscribe(val => {
      this.codeChallenge = val
    });

    var successAuth = this.AuthorizationCallback(this.callBackUrl);
    console.log('success');
    if (successAuth) {
      let callbackLinkRoute = '/tabs/home';
      this.navCtrl.navigateRoot(callbackLinkRoute);
    } else {
      let callbackLinkRoute = '/landing';
      this.navCtrl.navigateRoot(callbackLinkRoute);
    }
  }
  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.callbackUrlSubscription) {
      this.callbackUrlSubscription.unsubscribe();
    }

    if (this.codeChallengeSubscription) {
      this.codeChallengeSubscription.unsubscribe();
    }

    this.callBackService.changeArticleData(null);
    this.callBackService.changeCodeChallenge(null);
  }

  AuthorizationCallback(url: string): boolean {
    var splittedUrl = url.split('?');
    var params = splittedUrl[1].split('&');
    var code = params[0].split('=')[1];
    var scope = params[1].split('=')[1];
    var state = params[2].split('=')[1];
    var sessionState = params[3].split('=')[1];
    if (code != undefined && code != null) {
      this.storage.set("token", code);
      this.storage.set("state", state);
      this.storage.set("session_state", sessionState);
      this.storage.set("code_verifier", this.codeChallenge);
      //this.storage.get('token').then((val) => {
      //});



      return true;
    }
    return false;
  }
}
