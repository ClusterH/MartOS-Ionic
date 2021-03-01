import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/ConfigService';
import { GetByLocationRequest } from '../requests/GetByLocationRequest';
import { OnlineProduct } from '../models/OnlineProduct';
import { GetLatestsRequest } from '../requests/GetLatestsRequest';
import { GetByCategoryRequest } from '../requests/GetByCategoryRequest';
import { GetBySubCategoryRequest } from '../requests/GetBySubCategoryRequest';
import { StoreItem } from '../models/StoreItem';
import { GetByReferenceIdRequest } from '../requests/GetByReferenceIdRequest';
import { GetByItemIdRequest } from '../requests/GetByItemIdRequest';
import { GetStoreItemIdsRequest } from '../requests/GetStoreItemIdsRequest';
import { GetByCategoryResponse } from '../requests/GetByCategoryResponse';

@Injectable({
  providedIn: 'root'
})

export class OnlineProductClient {
    articleUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.articleUrl = `${this.configService.onlineStoreApiURI}/OnlineProduct`;
    }

  public async GetByLocation(request: GetByLocationRequest){
    return await this.httpClient.post<OnlineProduct[]>(`${this.articleUrl}/location`, request);
  }

  public async GetProductsMap(request: GetByLocationRequest){
    return await this.httpClient.post<StoreItem[]>(`${this.articleUrl}/map`, request);
  }

  public async GetMapProduct(request: GetStoreItemIdsRequest){
    return await this.httpClient.post<StoreItem[]>(`${this.articleUrl}/map/product`, request);
  }

  public async GetLatests(request: GetLatestsRequest){
    return await this.httpClient.post<OnlineProduct[]>(`${this.articleUrl}/latests`, request);
  }

  public async Getbycategory(request: GetByCategoryRequest){
    return await this.httpClient.post<GetByCategoryResponse>(`${this.articleUrl}/getbycategory`, request);
  }

  public async GetbySubcategory(request: GetBySubCategoryRequest){
    return await this.httpClient.post<OnlineProduct[]>(`${this.articleUrl}/getbysubcategory`, request);
  }

  public async GetBestSalesByCategory(request: GetByCategoryRequest){
    return await this.httpClient.post<OnlineProduct[]>(`${this.articleUrl}/bests`, request);
  }

  public async GetSalesByCategory(request: GetByCategoryRequest){
    return await this.httpClient.post<OnlineProduct[]>(`${this.articleUrl}/sales`, request);
  }

  public async GetByReferenceId(request: GetByReferenceIdRequest){
    return await this.httpClient.post<OnlineProduct[]>(`${this.articleUrl}/bystore`, request);
  }
}

