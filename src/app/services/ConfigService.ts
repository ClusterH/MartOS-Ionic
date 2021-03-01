import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthLogin } from '../core/auth.login';
@Injectable()

export class ConfigService {
  token: string;

  constructor(private httpClient: HttpClient,
    private auth: AuthLogin) {

  }

  get authApiURI() {
    return 'http://51.140.48.107:9080/api';
  }

  get tokenApiURI() {
    return 'http://51.140.48.107:9080';
  }

  get onlineStoreApiURI() {
    return 'http://23.100.50.205:6080/api';
  }

  get onlineUserURI() {
    return 'http://23.100.50.205:6030/api';
  }

  get paymentsURI() {
    return 'http://23.100.50.205:7010/api';
  }

  get ordersURI() {
    return 'http://10.0.2.2:5080/api';
  }

  authorizationHeaderValue(access_token: string): string {
    return `bearer ${access_token}`;
  }

  async buildHeader() {
    const result = await this.auth.buildHeaderRequest()

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authorizationHeaderValue(result)
    });
  }
}
