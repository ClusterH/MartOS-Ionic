import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/ConfigService';
import { OrderRequest } from '../../../requests/OrderRequest';
import { RetryOrderRequest } from '../../../requests/RetryOrderRequest';
import { OnlineOrder } from '../../../models/OnlineOrder';
import { GetAllOrdersRequest } from '../../../requests/GetAllOrdersRequest';
import { PaymentStatus } from '../../../models/PaymentStatus';
import { OrderInfo } from '../../../models/OrderInfo';
import { GetOrderRequest } from '../../../requests/GetOrderRequest';
import { Order } from '../../../models/Order';
@Injectable({
  providedIn: 'root'
})

export class OrdersClient {
  ordersUrl: string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.ordersUrl = `${this.configService.ordersURI}/Orders`;
    }

  public async CreateOrder(request: OrderRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<OnlineOrder>(`${this.ordersUrl}`, request, {
        headers: header
      });
  }

  public async RetryOrder(request: RetryOrderRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<PaymentStatus>(`${this.ordersUrl}/retry`, request, {
        headers: header
      });
  }

  public async GetAll(request: GetAllOrdersRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<OnlineOrder[]>(`${this.ordersUrl}/getAll`, request, {
        headers: header
      });
  }

  public async GetById(request: GetOrderRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<Order>(`${this.ordersUrl}/byId`, request, {
        headers: header
      });
  }

  public async GetInfos(request: GetAllOrdersRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<OrderInfo[]>(`${this.ordersUrl}/infos`, request, {
        headers: header
      });
  }
}