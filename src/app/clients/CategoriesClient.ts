import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/ConfigService';
import { GetCategoriesRequest } from '../requests/GetCategoriesRequest';
import { CategoryValues } from '../models/CategoryValues';
import { CategoryInfo } from '../models/CategoryInfo';
import { TopCategory } from '../models/TopCategory';
import { GetByStoreRequest } from '../requests/GetByStoreRequest';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class CategoriesClient {
    articleUrl:string;

  constructor(private httpClient: HttpClient) {
      this.articleUrl = `${environment.onlineStoreApiURI}/Categories`;
    }

  public async Get(request:GetCategoriesRequest){
    return await this.httpClient.post<CategoryInfo[]>(`${this.articleUrl}`, request);
  }

  public async GetCategoryValues(request:GetCategoriesRequest){
    return await this.httpClient.post<CategoryValues[]>(`${this.articleUrl}/categoriesvalues`, request);
  }

  public GetTopCategories(){
    return this.httpClient.get<TopCategory[]>(`${this.articleUrl}/top`);
  }

  public async GetBarCategory(request: GetCategoriesRequest){
    return await this.httpClient.post<CategoryValues[]>(`${this.articleUrl}/getbarcategory`, request);
  }

  public async GetSubCatByCategories(request: GetCategoriesRequest){
    return await this.httpClient.post<CategoryInfo[]>(`${this.articleUrl}/getsubcatbycat`, request);
  }

  public  GetCategoryByStoreId(request: GetByStoreRequest){
    return  this.httpClient.post<CategoryInfo[]>(`${this.articleUrl}/bystore`, request);
  }
}