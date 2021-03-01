import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from '../../models/Address';
import { AddressInfoRequest } from '../../requests/AddressInfoRequest';
import { AddressClient } from '../clients/AddressClient';
import { AddressService } from '../services/AddressService';
import { Location } from '@angular/common';
import { CheckoutService } from '../../my-orders/checkout/services/CheckoutService';
import { CreateAddressInfoRequest } from 'src/app/requests/CreateAddressInfoRequest';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit, OnDestroy {
  addresses: Address[] = [];
  sub: any;
  type = 'shipping';
  createdSubscription: Subscription;
  updatedSubscription: Subscription;
  backCheckoutSubscription: Subscription;
  checkoutBack: boolean = false;
  
  constructor(private location: Location,
    private addressClient : AddressClient, 
    private addressService : AddressService,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.createdSubscription = this.addressService.currentCreatedAddress.subscribe(newAddress => {
      if (!newAddress || newAddress == null) {
        return;
      }
      
      this.addresses.push(newAddress);
    });

    this.updatedSubscription = this.addressService.currentUpdatedAddress.subscribe(updatedAddress => {
      if (!updatedAddress || updatedAddress == null) {
        return;
      }
      
      this.addresses.forEach(list => {
        if (list.id == updatedAddress.id) {
          if (list.defaultShipping != updatedAddress.defaultShipping) {
            if (updatedAddress.defaultShipping == true) {
              this.addresses.forEach(address =>{
                address.defaultShipping = false;
              })
            }
          }

          if (list.defaultShipping != updatedAddress.defaultbilling) {
            if (updatedAddress.defaultbilling == true) {
              this.addresses.forEach(address =>{
                address.defaultbilling = false;
              })
            }
          }

          list.address = updatedAddress.address;
          list.city = updatedAddress.city,
          list.optionalInfo = updatedAddress.optionalInfo;
          list.country = updatedAddress.country,
          list.defaultShipping = updatedAddress.defaultShipping;
          list.defaultbilling = updatedAddress.defaultbilling,
          list.postcode = updatedAddress.postcode
        }
      });
    });

    let request = <AddressInfoRequest> {
      country : "France"
    };

    this.sub = this.route.params.subscribe(params => {
      if (params.type) {
        this.type = params.type;
      }
    });

    return new Promise(async (resolve) => {
    (await this.addressClient.GetAll(request)).subscribe(addresses => {
      console.log(addresses);
      resolve(addresses);
      this.addresses = addresses
    });
  });
  }

  addAddrress() {
    this.router.navigate(['address/add']);
  }

  editAddress(item : Address) {
    this.addressService.changeUpdateAddress(item);
    this.router.navigate(['address/edit/' + item.id]);
  }

  ngOnDestroy() {
    if (this.createdSubscription) {
      this.createdSubscription.unsubscribe();
    }

    if (this.updatedSubscription) {
      this.updatedSubscription.unsubscribe();
    }

    if (this.backCheckoutSubscription) {
      this.backCheckoutSubscription.unsubscribe();
    }
    
    this.checkoutService.changeBackAddress(null);
    this.addressService.changeCreatedAddress(null);
    this.addressService.changeUpdatedAddress(null);
  }

  changeActiveAddress(type, item) {
  }

  async updateDefaultShipping(address: Address) {
    this.addresses.forEach((add: Address) => add.defaultShipping = false);
    address.defaultShipping = true;
    let request = <CreateAddressInfoRequest> {
      country : "France",
      addressInfo : address
    };
    (await this.addressClient.Update(request)).subscribe(val => {
      this.addressService.changeUpdatedAddress(address);
    });
  }
}
