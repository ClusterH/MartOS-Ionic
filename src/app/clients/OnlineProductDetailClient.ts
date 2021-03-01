import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/ConfigService';
import { OnlineProductDetail } from '../models/OnlineProductDetail';
import { GetByItemIdRequest } from '../requests/GetByItemIdRequest';

@Injectable({
  providedIn: 'root'
})

export class OnlineProductDetailClient {
    articleUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.articleUrl = `${this.configService.onlineStoreApiURI}/OnlineArticleDetail`;
    }

  public async GetDetail(request: GetByItemIdRequest){
    return await this.httpClient.post<OnlineProductDetail>(`${this.articleUrl}`, request);
  }
}