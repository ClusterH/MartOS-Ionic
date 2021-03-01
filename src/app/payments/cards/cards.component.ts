import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CardInfo } from '../models/CardInfo';
import { CardsClient } from '../clients/CardsClient';
import { DeleteCardRequest } from '../models/DeleteCardRequest';
import { Subscription } from 'rxjs';
import { CardService } from '../services/CardService';
import { CardsRequest } from '../requests/CardsRequest';
import { CheckoutService } from '../../my-orders/checkout/services/CheckoutService';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  cardInfos: CardInfo[] = [];
  cardSubscription: Subscription;
  backCheckoutSubscription: Subscription;
  checkoutBack: boolean = false;

  constructor(private location: Location,
    private cardService: CardService,
    private cardsClient: CardsClient,
    private checkoutService: CheckoutService,
    private router: Router,
    private cardsService: CardService) { }

  paymentScreen: boolean = false;

  backClicked() {
    if (this.checkoutBack == true) {
      this.checkoutBack = false;
      let checkoutRoute = '/my-orders/checkout';
      this.router.navigate([checkoutRoute]);
    } else {
      this.location.back();
    } 
  }

  async ngOnInit() {
    this.backCheckoutSubscription = this.checkoutService.currentBackCards.subscribe(async back => {
      if (!back) {
        return;
      }

      if (back == "back") {
        this.checkoutBack = true;
      }
    });

    return new Promise(async (resolve) => {
    this.cardSubscription = this.cardService.currentreloadInfos.subscribe(async reload => {
      if (!reload) {
        return;
      }
      
      (await this.cardsClient.Get(request)).subscribe((cardInfos) => {
        resolve(cardInfos);
        if (cardInfos != null && cardInfos !== undefined) {
          this.cardInfos = cardInfos;
          if (this.paymentScreen === true) {
            this.checkoutService.changeCardInfo(this.cardInfos[0]);
          }
        }
      });
    });

    this.paymentScreen = !!localStorage.getItem('address');
    let request = <CardsRequest>{
      country : "France"
    };

    (await this.cardsClient.Get(request)).subscribe((cardInfos) => {
      resolve(cardInfos);
      if (cardInfos != null && cardInfos !== undefined) {
        console.log(this.cardInfos)
        this.cardInfos = cardInfos;
        if (this.paymentScreen === true) {
          this.checkoutService.changeCardInfo(this.cardInfos[0]);
        }
      }
    });
  });
  }

  // delete event to attach to the delete button
  async addCard(isEdit?, id?: string) {
    if (isEdit == true) {

      let request = <DeleteCardRequest>{
        id: id
      };

      (await this.cardsClient.Delete(request)).subscribe(() => {
        let infos = this.cardInfos.filter(v => v.id !== request.id);
        this.cardInfos = infos;
      });
    } else {
      this.router.navigateByUrl(isEdit ? 'payments/details?isEdit=true' : 'payments/details')
    }
  }

  async setDefaultCard(cardInfo: CardInfo) {
    let request = <CardsRequest>{
      country : "France",
      id: cardInfo.id,
      isEnabled: cardInfo.isEnabled
    };

    (await this.cardsClient.Enable(request)).subscribe((val) => {
      this.cardsService.changeNewEnabledCard("newEnabled") 
      this.cardInfos.forEach(card => {
        if (card.id == cardInfo.id) {
          card.isEnabled = cardInfo.isEnabled;
        } else {
          card.isEnabled = false;
        }
      });  
    });
  }

  async ngOnDestroy() {

    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }

    
    if (this.backCheckoutSubscription) {
      this.backCheckoutSubscription.unsubscribe();
    }
    
    this.cardService.changeReloadInfos(null);
    this.checkoutService.changeBackCard(null);
  }
}
