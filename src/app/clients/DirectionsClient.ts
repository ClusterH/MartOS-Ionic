import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/ConfigService';
import {  GetRouteRequest } from '../requests/GetRouteRequest';
import { Point } from '../models/Point';
import { ListDirections } from '../models/ListDirections';

@Injectable({
  providedIn: 'root'
})

export class DirectionsClient {
    articleUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.articleUrl = `${this.configService.onlineStoreApiURI}/Directions`;
    }

  public async GetProductDirection(request: GetRouteRequest){
    return await this.httpClient.post<Point[]>(`${this.articleUrl}/product`, request);
  }

  public async GetListRouteDirection(request: GetRouteRequest){
    return await this.httpClient.post<ListDirections>(`${this.articleUrl}/list`, request);
  }
}

