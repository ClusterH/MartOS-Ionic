import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnlineArticle } from 'src/app/models/OnlineArticle';
import { ConfigService } from 'src/app/services/ConfigService';
import { environment } from 'src/environments/environment';
import { AddArticleToListRequest, GetShoppingListRequest, RemoveShoppingListRequest, ShoopingListCreate, ShoppingList, SingleShoppingList, UpdateShoppingListRequest } from '../models/shopping-list.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  activeArticle: BehaviorSubject<OnlineArticle> = new BehaviorSubject<OnlineArticle>(null);
  baseUrl = environment.onlineUserApi;
  header;

  shoppingList : ShoppingList;
  private shoppingList$ = new BehaviorSubject<ShoppingList>(this.shoppingList);
  currentShoppingList = this.shoppingList$.asObservable();

  updatedShoppingList : ShoppingList;
  private updatedShoppingList$ = new BehaviorSubject<ShoppingList>(this.updatedShoppingList);
  currentUpdatedShoppingList = this.updatedShoppingList$.asObservable();

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  changeShoppingList(shoppingList : ShoppingList) {
    this.shoppingList$.next(shoppingList);
  }

  changeUpdatedShoppingList(shoppingList : ShoppingList) {
    this.updatedShoppingList$.next(shoppingList);
  }

  async getShoppingLists(request: GetShoppingListRequest) {
    const header = await this.configService.buildHeader();

    return this.http.post<ShoppingList[]>(this.baseUrl + '/ShoppingList/getinfos', request, {
      headers: header
    });
  }

  async getListByid(request: SingleShoppingList) {
    const header = await this.configService.buildHeader();

    return this.http.post<ShoppingList>(this.baseUrl + '/ShoppingList/byid', request, {
      headers: header
    });
  }

  async getFavorites(request: GetShoppingListRequest) {
    const header = await this.configService.buildHeader();

    return this.http.post<ShoppingList>(this.baseUrl + '/ShoppingList/favourites', request, {
      headers: header
    });
  }

  async deleteList(request: SingleShoppingList) {
    const header = await this.configService.buildHeader();

    return this.http.post<any>(this.baseUrl + '/ShoppingList/delete', request, {
      headers: header
    });
  }

  async createNewShoppingList(request: ShoopingListCreate) {
    const header = await this.configService.buildHeader();

    return this.http.post<ShoppingList>(this.baseUrl + '/ShoppingList/insert', request, {
      headers: header
    });
  }

  async updateShoppingList(request: UpdateShoppingListRequest) {
    const header = await this.configService.buildHeader();

    return this.http.post<ShoppingList>(this.baseUrl + '/ShoppingList/update', request, {
      headers: header
    });
  }

  async addArticleToList(request: AddArticleToListRequest) {
    const header = await this.configService.buildHeader();

    return this.http.post<any>(this.baseUrl + '/ShoppingList/add', request, {
      headers: header
    });
  }

  async removeArticleFromList(request: RemoveShoppingListRequest) {
    const header = await this.configService.buildHeader();
    return this.http.post<any>(this.baseUrl + '/ShoppingList/removearticle', request, {
      headers: header
    });
  }

}
