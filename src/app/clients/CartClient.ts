import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/ConfigService';
import { Cart } from '../models/Cart';
import { GetCartRequest } from '../requests/GetCartRequest';
import { CartRequest } from '../requests/CartRequest';

@Injectable({
  providedIn: 'root'
})

export class CartClient {
    cartUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.cartUrl = `${this.configService.onlineUserURI}/cart`;
    }

  public async GetCart(request: GetCartRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<Cart>(`${this.cartUrl}`, request, {
        headers: header
      });
  }

  public async Update(request: CartRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post(`${this.cartUrl}/update`, request, {
        headers: header
      });
  }
}