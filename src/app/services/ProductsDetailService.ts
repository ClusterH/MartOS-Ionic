
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GetByItemIdRequest } from '../requests/GetByItemIdRequest';
import { OnlineProductDetail } from '../models/OnlineProductDetail';
import { OnlineArticle } from '../models/OnlineArticle';
import { OptionVM } from '../models/OptionVM';

@Injectable({
    providedIn: 'root'
  })
  
export class ProductsDetailService {
  
  getDetailRequest : GetByItemIdRequest;
  private getDetailRequest$ = new BehaviorSubject<GetByItemIdRequest>(this.getDetailRequest);
  currentGetDetailRequest = this.getDetailRequest$.asObservable();

  productDetail : OnlineProductDetail;
  private productDetail$ = new BehaviorSubject<OnlineProductDetail>(this.productDetail);
  currentProductDetail = this.productDetail$.asObservable();

  article : OnlineArticle;
  private article$ = new BehaviorSubject<OnlineArticle>(this.article);
  currentArticle = this.article$.asObservable();

  actualOptions : OptionVM[];
  private actualOptions$ = new BehaviorSubject<OptionVM[]>(this.actualOptions);
  currentActualOptions = this.actualOptions$.asObservable();

  changeDetailRequest(getDetailRequest : GetByItemIdRequest) {
    this.getDetailRequest$.next(getDetailRequest);
  }

  changeProductDetail(productDetail : OnlineProductDetail) {
    this.productDetail$.next(productDetail);
  }

  changeActualOptions(actualOptions : OptionVM[]) {
    this.actualOptions$.next(actualOptions);
  }

  changeArticle(article : OnlineArticle) {
    this.article$.next(article);
  }
}