import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { IAuthAction, AuthActions } from 'ionic-appauth';
import { NavController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { LoginRequest } from '../requests/LoginRequest';
import { Router } from '@angular/router';
import { CallbackService } from '../core/callback.service';
import { LoginViewModel } from '../models/LoginViewModel';
import { IdentityClient } from '../auth/clients/IdentityClient';
declare let cordova: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  action : IAuthAction;
  loginViewModel : LoginViewModel;
  request : LoginRequest;
  browser : any;

  private readonly identityClient : IdentityClient;
  private readonly router : Router;
  private readonly callBackService : CallbackService;
  constructor(
    private auth : AuthService,
    private navCtrl : NavController,
    identityClient : IdentityClient,
    router : Router,
    callBackService : CallbackService
  ) {
    this.identityClient = identityClient;
    this.router = router;
    this.callBackService = callBackService;
   }

  ngOnInit() {
    this.auth.authObservable.subscribe((action) => {
      this.action = action
      if(action.action == AuthActions.SignInSuccess){
        this.navCtrl.navigateRoot('tabs');
      }
    });
  }

  private strRandom(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

generateState(){
  return this.strRandom(32);
}

generateCodeChalenge() {
  const codeVerifier = this.strRandom(128);
  const codeVerifierHash = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
  var code = codeVerifierHash
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
      console.log(code);

  return code;
}

async buildUrl(){
  var codeChallenge = this.generateCodeChalenge();
  var state = this.generateState();
  var clientId = "examplemobile";
  var authority = "http://192.168.1.16:9080";
  var baseCallbackUrl = "http://localhost:8000"; 
  var redirectUrl = `${baseCallbackUrl}/implicit/callback`.toString();
  var endSessionRedirectUrl: "appauth://endSession";
  var scopes = "openid";
  var responseType = "code";
  var url = `/connect/authorize/callback?redirect_uri=${redirectUrl}&client_id=${clientId}&response_type=${responseType}&scope=${scopes}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`; 

  this.request = <LoginRequest>
  {
    returnUrl: url
  };

  (await this.identityClient.Login(this.request)).subscribe(val => {
    console.log(val)
    let returnCall = val.returnUrl;
    this.loginViewModel = val;
    this.browser = cordova.InAppBrowser.open(`${authority}/account/login?returnUrl=${returnCall}`, '_blank', 'location=no,toolbar=no');
    
    this.browser.addEventListener('loadstart', (event) => {
      this.sendCallback(event);
      
    });
  });
}

sendCallback(event : any){
  var url = <string>event.url;
  var redirectUrl = "http://localhost:8000/implicit/callback";
   
  const results = decodeURIComponent(url);
  var splitedUrl = results.split("//");
  var urlResult = splitedUrl[1].split(':');
  var urlPortAndLink = urlResult[1].split("/");
  var callbackLink = urlPortAndLink[2].split('?'); 
  
  var splitedRedirectUrl = redirectUrl.split('http://');
  var redirectPortAndLink = splitedRedirectUrl[1].split(':');
  var returnCallbackLink = redirectPortAndLink[1].split("/");
    
  if (urlResult[0] == redirectPortAndLink[0] 
    && urlPortAndLink[0] == returnCallbackLink[0]
    && urlPortAndLink[1] == returnCallbackLink[1]
    && callbackLink[0] == returnCallbackLink[2]) {
      var splitedUrl = results.split("//");
      var urlResult = splitedUrl[1].split(':8000');
      this.browser.close();
      this.callBackService.changeArticleData(urlResult[1]);
      let callbackLinkRoute = '/implicit/authcallback';
      this.router.navigate([callbackLinkRoute]);
  }
}

signIn(){
 this.buildUrl();
   }  
}
