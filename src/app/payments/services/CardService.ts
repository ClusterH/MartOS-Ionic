import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardInfo } from '../models/CardInfo';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  cardInfos: CardInfo[] = [];
  private cardInfos$ = new BehaviorSubject<CardInfo[]>(this.cardInfos);
  currentCardInfosProducts = this.cardInfos$.asObservable();

  reloadInfo: string;
  private reloadInfos$ = new BehaviorSubject<string>(this.reloadInfo);
  currentreloadInfos = this.reloadInfos$.asObservable();

  activeCard: CardInfo = null;
  private activeCardInfos$ = new BehaviorSubject<CardInfo[]>(this.cardInfos);
  activeCardInfosProducts = this.activeCardInfos$.asObservable();

  newEnabledCard: string = null;
  private newEnabledCard$ = new BehaviorSubject<string>(this.newEnabledCard);
  currentnewEnabledCard = this.newEnabledCard$.asObservable();

  changeCardInfo(cardInfos: CardInfo[]) {
    this.cardInfos$.next(cardInfos);
  }

  changeNewEnabledCard(cardInfos: string) {
    this.newEnabledCard$.next(cardInfos);
  }

  changeReloadInfos(reload: string) {
    this.reloadInfos$.next(reload);
  }
}