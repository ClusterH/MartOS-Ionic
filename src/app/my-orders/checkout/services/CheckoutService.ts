
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserDetail } from '../../../user/models/UserDetail';
import { CardInfo } from '../../../payments/models/CardInfo';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {

  delivery: BehaviorSubject<string> = new BehaviorSubject<string>('pickup');
  defaultShippingAddress: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  defaultbillingAddress: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  activePayment: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  Addresses = [];
  paymentMethods = [];

  backCards: string;
  private backCards$ = new BehaviorSubject<string>(null);
  currentBackCards = this.backCards$.asObservable();

  backAddress: string;
  private backAddress$ = new BehaviorSubject<string>(null);
  currentBackAddress = this.backAddress$.asObservable();

  userDetail: UserDetail;
  private userDetail$ = new BehaviorSubject<UserDetail>(null);
  currentUserDetail = this.userDetail$.asObservable();

  cardInfo: CardInfo;
  private cardInfo$ = new BehaviorSubject<CardInfo>(null);
  currentCardInfo = this.cardInfo$.asObservable();

  orderType: string;
  private orderType$ = new BehaviorSubject<string>(null);
  currentOrderType = this.orderType$.asObservable();

  changeBackAddress(back: string) {
    this.backAddress$.next(back);
  }

  changeUserDetail(userDetail: UserDetail) {
    this.userDetail$.next(userDetail);
  }

  changeBackCard(back: string) {
    this.backCards$.next(back);
  }

  changeCardInfo(cardInfo: CardInfo) {
    this.cardInfo$.next(cardInfo);
  }

  changeOrderType(orderType: string) {
    this.orderType$.next(orderType);
  }
}