import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/ConfigService';
import { GetOrderRequest } from '../../../requests/GetOrderRequest';
import { DeliveryClientOrder } from '../../../models/DeliveryClientOrder';
import { UserConnection } from '../../../models/UserConnection';
import { DeliveryExistResponse } from '../../../requests/DeliveryExistResponse';
import { DeliveryExistRequest } from '../../../requests/DeliveryExistRequest';
@Injectable({
  providedIn: 'root'
})

export class DeliveryOrdersClient {
    ordersUrl: string;
  
      private configService: ConfigService;
    constructor(private httpClient: HttpClient,
      configService: ConfigService) {
        this.configService = configService;
        this.ordersUrl = `${this.configService.ordersURI}/DeliveryOrders`;
      }
  
    public async GetById(request: GetOrderRequest){
      let header = await this.configService.buildHeader();
      return await this.httpClient.post<DeliveryClientOrder>(`${this.ordersUrl}/ById`, request, {
          headers: header
        });
    }
  
    public async GetLatest(request: GetOrderRequest){
      let header = await this.configService.buildHeader();
      return await this.httpClient.post<DeliveryClientOrder>(`${this.ordersUrl}/GetLatest`, request, {
          headers: header
        });
    }

    public async CurrentOrderExist(request: DeliveryExistRequest){
      let header = await this.configService.buildHeader();
      return await this.httpClient.post<DeliveryExistResponse>(`${this.ordersUrl}/CurrentOrderExist`, request, {
          headers: header
        });
    }

    public async GetConnectionId(){    
      let header = await this.configService.buildHeader();
      return this.httpClient.get<UserConnection>(`${this.ordersUrl}`, {
          headers: header
        });
    }
}