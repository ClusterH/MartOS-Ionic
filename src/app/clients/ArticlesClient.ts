import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/ConfigService';
import { GetByLocationRequest } from '../requests/GetByLocationRequest';
import { StoreItem } from '../models/StoreItem';
import { ArticleData } from '../models/ArticleData';
import { GetByStoreRequest } from '../requests/GetByStoreRequest';
import { StoreView } from '../models/StoreView';

@Injectable({
  providedIn: 'root'
})

export class ArticlesClient {
    articleUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.articleUrl = `${this.configService.onlineStoreApiURI}/articles`;
    }

  public async GetByLocation(request:GetByLocationRequest){
    return await this.httpClient.post<StoreItem[]>(`${this.articleUrl}/location`, request);
  }

  public async Search(request:GetByLocationRequest){
    return await this.httpClient.post<ArticleData[]>(`${this.articleUrl}/search`, request);
  }

  public async GetbyStoreCategories(request: GetByStoreRequest){
    return await this.httpClient.post<StoreView>(`${this.articleUrl}/byStoreCategories`, request);
  }
}