import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../../../models/Cart';
import { UsersClient } from '../../../user/clients/UsersClient';
import { CheckoutService } from '../services/CheckoutService';
import { CardInfo } from '../../../payments/models/CardInfo';
import { AddressClient } from '../../../address/clients/AddressClient';
import { AddressInfoRequest } from '../../../requests/AddressInfoRequest';
import { Address } from '../../../models/Address';
import { UserInfo } from '../../../user/models/UserInfo';
import { CardsClient } from '../../../payments/clients/CardsClient';
import { CardsRequest } from '../../../payments/requests/CardsRequest';
import { AddressService } from '../../../address/services/AddressService';
import { Subscription } from 'rxjs/internal/Subscription';
import { CardService } from '../../../payments/services/CardService';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() cart: Cart;
  user: UserInfo;
  updateSubscription: Subscription;
  createdSubscription: Subscription;
  cardsSubscription: Subscription;
  billingSameAsShipping = false;
  activePaymentId = '1';
  cardsUser: CardInfo;
  selectedCard: CardInfo;
  defaultBilling = true;
  saveBilling = false;
  defaultPayment = true;
  savePayment = false;
  address: Address;
  constructor(private usersClient: UsersClient,
    public checkoutService: CheckoutService,
    private addressClient: AddressClient,
    private addressService : AddressService,
    private router: Router,
    private cardsClient: CardsClient,
    private cardsService: CardService) {
  }

  async ngOnInit() {

    this.updateSubscription = this.addressService.currentUpdatedAddress.subscribe(address => {
      if (!address || address == null) {
        return;
      }

      if (address.defaultShipping == true) {
        this.address = address
      }
    });

    this.createdSubscription = this.addressService.currentCreatedAddress.subscribe(address => {
      if (!address || address == null) {
        return;
      }

      if (address.defaultShipping == true) {
        this.address = address
      }
    });

    return new Promise(async (resolve) => {  
    this.cardsSubscription = this.cardsService.currentnewEnabledCard.subscribe(async newCard => {
      if (newCard == null) {
        return;
      }

      (await this.cardsClient.Current(cardsRequest)).subscribe((cards) => {
        resolve(cards);
        this.cardsUser = cards;
      });
    });

      let request = <AddressInfoRequest> {
        country : "France"
      };
  
      (await this.addressClient.Current(request)).subscribe(address =>{
        resolve(address);
        this.address = address;
        this.addressService.currentAddress = this.address
      });
  
      (await this.usersClient.GetUserInfo()).subscribe((user) => {
        resolve(user);
        this.user =  user;
        this.addressService.userInfo = this.user
      });

      let cardsRequest = <CardsRequest> {
        country : "France"
      };
  
      (await this.cardsClient.Current(cardsRequest)).subscribe((cards) => {
        resolve(cards);
        this.cardsUser = cards;
      });
    });
  }

  ngOnDestroy() {
    if (this.createdSubscription) {
      this.createdSubscription.unsubscribe();
    }

    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }

    if (this.cardsSubscription) {
      this.cardsSubscription.unsubscribe();
    }

    this.addressService.changeUpdatedAddress(null);    
    this.addressService.changeCreatedAddress(null);
    this.cardsService.changeNewEnabledCard(null);
  }

  changeDeliveryOption(option) {
    this.checkoutService.delivery.next(option);
  }

  changeAddress(address) {
    this.checkoutService.changeBackAddress("back");
    this.router.navigate(['/address/' + (address ? 'address-list/' : 'add/')]);
  }

  changePayment() {
    this.checkoutService.changeBackCard("back");
    this.router.navigate(['/payments/cards'])
  }

  radioChange(event) {
    // event.detail.value
  }

  switchBilling() {
    this.defaultBilling = !this.defaultBilling;
  }
  switchPayment() {
    this.defaultPayment = !this.defaultPayment;
  }
}
