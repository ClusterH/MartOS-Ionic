import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/ConfigService';
import { CreateAddressInfoRequest } from '../../requests/CreateAddressInfoRequest';
import { AddressInfoRequest } from '../../requests/AddressInfoRequest';
import { Address } from '../../models/Address';
@Injectable({
  providedIn: 'root'
})

export class AddressClient {
    addressUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.addressUrl = `${this.configService.onlineUserURI}/AddressInfo`;
    }

  public async Insert(request: CreateAddressInfoRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<Address>(`${this.addressUrl}`, request, {
        headers: header
      });
  }

  public async Update(request: CreateAddressInfoRequest){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post(`${this.addressUrl}/update`, request, {
        headers: header
      });
  }

  public async GetAll(request: AddressInfoRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<Address[]>(`${this.addressUrl}/getAll`, request, {
        headers: header
      });
  }

  public async GetById(request: AddressInfoRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<Address>(`${this.addressUrl}/byId`, request, {
        headers: header
      });
  }

  public async Current(request: AddressInfoRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post<Address>(`${this.addressUrl}/current`, request, {
        headers: header
      });
  }

  public async UpdateDefaultBilling(request: AddressInfoRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post(`${this.addressUrl}/defaultBilling`, request, {
        headers: header
      });
  }

  public async UpdateDefaultShipping(request: AddressInfoRequest){
    let header = await this.configService.buildHeader();
    return this.httpClient.post(`${this.addressUrl}/defaultShipping`, request, {
        headers: header
      });
  }
}