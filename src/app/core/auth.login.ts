import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { TokenRequest } from '../requests/TokenRequest';
import { TokenResponse } from '../requests/TokenResponse';
import { environment } from '../../environments/environment';
import { decode } from 'punycode';
import { timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthLogin {
  isAuthSucceed: boolean;
  token: string;
  currentAccess: string;
  constructor(private storage: Storage,
    private httpClient: HttpClient) {
  }


  async logout() {
    await this.storage.remove("access_token");
    await this.storage.remove("expires_at");
    await this.storage.remove("refresh_token");
    await this.storage.remove("token");
    await this.storage.remove("code_verifier");
    let c = await this.storage.get("access_token");
    this.storage.clear();
  }

  isAuth(): boolean {
    this.isValid();
    this.isAuthSucceed = false;
    if (this.token) {
      return true;
    }
    return false;
  }

  async getAccessTokenValue(): Promise<string> {
    return await this.storage.get('access_token');
  }

  async getToken() {
    return await this.storage.get('token');
  }

  isValid() {
    this.storage.get('token').then((val) => {
      if (!val) {
        return;
      }
      this.token = val;
    });
  }

  async buildHeaderRequest(): Promise<string> {
    console.log('header request');
    let accessToken = await this.storage.get('access_token');
    console.log(accessToken);
    if (accessToken != null && accessToken != undefined) {
      console.log('token defined');
      let expiresAt = await this.storage.get('expires_at')

      let expiry = Number(expiresAt)
      var dateExpiry = new Date(expiry * 1000);
      if (new Date() > dateExpiry) {
        await this.storage.remove("access_token");
        await this.reniewAccessToken();
        accessToken = await this.storage.get('access_token')
        return accessToken;

      } else {
        console.log(accessToken);
        return accessToken;
      }
    } else {
      console.log('undefined');
      accessToken = await this.getAccessToken();
      console.log(accessToken);
      //accessToken = await this.storage.get('access_token')
      // alert(1)
      // alert(this.currentAccess)
      return this.currentAccess;
    }
  }

  async getAccessToken(): Promise<any> {
    var baseCallbackUrl = "http://localhost:8000";
    var redirectUrl = `${baseCallbackUrl}/implicit/callback`.toString();
    var code = await this.storage.get("token");
    var codeChallenge = await this.storage.get("code_verifier");

    let request = <TokenRequest>{
      client_id: "examplemobile",
      code: code,
      grant_type: "authorization_code",
      code_verifier: codeChallenge,
      redirect_uri: redirectUrl
    };
    let tokens;
    return new Promise(async (resolve) => {
    (await this.GetToken(request)).subscribe(async resp => {
      console.log(resp)
      this.currentAccess = resp.accessToken;
      tokens = resp.accessToken;
      await this.storage.set("access_token", resp.accessToken);
      await this.storage.set("refresh_token", resp.refreshToken);
      await this.storage.set("expires_at", resp.expiry);
      resolve(tokens);
    });
  });
  }

  async reniewAccessToken() : Promise<any> {
    var baseCallbackUrl = "http://localhost:8000";
    var redirectUrl = `${baseCallbackUrl}/implicit/callback`.toString();
    var refreshToken = await this.storage.get("refresh_token");
    let request = <TokenRequest>{
      client_id: "examplemobile",
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      redirect_uri: redirectUrl
    };

    return new Promise(async (resolve) => {
    (await this.GetRefreshToken(request)).subscribe(async resp => {
      console.log(resp)
      //await this.storage.remove("access_token");
      await this.storage.remove("expires_at");
      await this.storage.remove("refresh_token");
      await this.storage.set("access_token", resp.accessToken);
      await this.storage.set("refresh_token", resp.refreshToken);
      await this.storage.set("expires_at", resp.expiry);
      resolve(resp.accessToken);
    });
  });
  }

  public async GetToken(request: TokenRequest) {
    return await this.httpClient.post<TokenResponse>(`${environment.authApiURI}/users/token`, request).pipe(timeout(300000));
  }

  public async GetRefreshToken(request: TokenRequest) {
    return await this.httpClient.post<TokenResponse>(`${environment.authApiURI}/users/refreshtoken`, request);
  }
}
