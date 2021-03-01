import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../requests/LoginRequest';
import { LoginViewModel } from '../../models/LoginViewModel';
import { CreateAccountRequest } from '../../requests/CreateAccountRequest';
import { environment } from '../../../environments/environment';
import { TokenRequest } from 'src/app/requests/TokenRequest';
import { TokenResponse } from 'src/app/requests/TokenResponse';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class IdentityClient {

  constructor(private httpClient: HttpClient) {
    }

  public async Login(request : LoginRequest){
    return await this.httpClient.post<LoginViewModel>(`${environment.authApiURI}/Users/login`, request);
  }

  public async CreateAccount(request : CreateAccountRequest){
    return await this.httpClient.post(`${environment.authApiURI}/Users/createAccount`, request);
  }

  public async GetToken(request: TokenRequest) {
    return await this.httpClient.post<TokenResponse>(`${environment.authApiURI}/Users/token`, request).pipe(
      timeout(300000)
    );;
  }

  public async GetRefreshToken(request: TokenRequest) {
    return await this.httpClient.post<TokenResponse>(`${environment.authApiURI}/Users/refreshtoken`, request).pipe(
      timeout(300000)
    );
}
}