import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Address } from '../../models/Address';
import { CreateAddressInfoRequest } from '../../requests/CreateAddressInfoRequest';
import { AddressClient } from '../clients/AddressClient';
import { AddressService } from '../services/AddressService';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit, OnDestroy {

  updateSubscription: Subscription;
  addressForm = new FormGroup({
    id: new FormControl(null),
    username: new FormControl(null),
    phone: new FormControl(null),
    indicatif: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    city: new FormControl(null),
    zipcode: new FormControl(null),
    country: new FormControl(null),
    defaultShipping: new FormControl(false),
    defaultbilling: new FormControl(false)
  });
  sub: any;
  constructor(private addressClient : AddressClient,
    private addressService : AddressService, private location: Location) { }

  ngOnInit() {
    this.updateSubscription = this.addressService.currentUpdateAddress.subscribe(updateAddress => {
      if (!updateAddress || updateAddress == null) {
        return;
      }

      this.addressForm = new FormGroup({
        id: new FormControl(updateAddress.id),
        username: new FormControl(updateAddress.username),
        phone: new FormControl(updateAddress.phone),
        indicatif: new FormControl(updateAddress.indicatif),
        addressLine1: new FormControl(updateAddress.address),
        addressLine2: new FormControl(updateAddress.optionalInfo),
        city: new FormControl(updateAddress.city),
        zipcode: new FormControl(updateAddress.postcode),
        country: new FormControl(updateAddress.country),
        defaultShipping: new FormControl(updateAddress.defaultShipping),
        defaultbilling: new FormControl(updateAddress.defaultbilling)
      });
    });
  }

  async saveAddress() {
      // edit mode
      let address = <Address> {
        address : String(this.addressForm.get('addressLine1').value),
        city : String(this.addressForm.get('city').value),
        country : String(this.addressForm.get('country').value),
        defaultShipping : this.addressForm.get('defaultShipping').value,
        defaultbilling : this.addressForm.get('defaultbilling').value,
        optionalInfo : String(this.addressForm.get('addressLine2').value),
        postcode : String(this.addressForm.get('zipcode').value)
      };

      if (this.addressForm.get('id').value) {
        address.id = this.addressForm.get('id').value;
        let request = <CreateAddressInfoRequest> {
          country : "France",
          addressInfo : address
        };

        (await this.addressClient.Update(request)).subscribe(val => {
          this.addressService.changeUpdatedAddress(address);
          this.location.back();
        });
      } else {
        let request = <CreateAddressInfoRequest> {
          country : "France",
          addressInfo : address
        };
        
        return new Promise(async (resolve) => {
          (await this.addressClient.Insert(request)).subscribe(address => {
            resolve(address);
            this.addressService.changeCreatedAddress(address);
            this.location.back();
          });
       });
      }
    } 

    ngOnDestroy() {
      if (this.updateSubscription) {
        this.updateSubscription.unsubscribe();
      }
      
      this.addressService.changeUpdateAddress(null);
    }
  }  
  

