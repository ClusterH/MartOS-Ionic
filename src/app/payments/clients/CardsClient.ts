import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/ConfigService';
import { CardInfo } from '../models/CardInfo';
import { DeleteCardRequest } from '../models/DeleteCardRequest';
import { CreatePaymentResponse } from '../models/CreatePaymentResponse';
import { CreatePaymentRequest } from '../models/CreatePaymentRequest';
import { CardsRequest } from '../requests/CardsRequest';

@Injectable({
  providedIn: 'root'
})

export class CardsClient {
    paymentsUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.paymentsUrl = `${this.configService.paymentsURI}/Cards`;
    }

  public async Get(request: CardsRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<CardInfo[]>(`${this.paymentsUrl}/get`, request, {
        headers: header
      });
  }

  public async Enable(request: CardsRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<CardInfo[]>(`${this.paymentsUrl}/enable`, request, {
        headers: header
      });
  }

  public async Current(request: CardsRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<CardInfo>(`${this.paymentsUrl}/current`, request, {
        headers: header
      });
  }

  public async Delete(request: DeleteCardRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post(`${this.paymentsUrl}/delete`, request, {
        headers: header
      });
  }

  public async Create(request: CreatePaymentRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<CreatePaymentResponse>(`${this.paymentsUrl}`, request, {
        headers: header
      });
  }
}