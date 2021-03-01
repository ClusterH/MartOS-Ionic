
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../../models/Address';
import { UserInfo } from '../../user/models/UserInfo';
@Injectable({
    providedIn: 'root'
  })
  
export class AddressService {    
    public currentAddress: Address;
    public userInfo: UserInfo;
    createdAddress : Address;
    private createdAddress$ = new BehaviorSubject<Address>(this.createdAddress);
    currentCreatedAddress = this.createdAddress$.asObservable();

    updateAddress : Address;
    private updatedAddress$ = new BehaviorSubject<Address>(this.updateAddress);
    currentUpdatedAddress = this.updatedAddress$.asObservable();

    address : Address;
    private updateAddress$ = new BehaviorSubject<Address>(this.address);
    currentUpdateAddress = this.updateAddress$.asObservable();

    changeCreatedAddress(address : Address) {
      this.createdAddress$.next(address);
    }

    changeUpdatedAddress(address : Address) {
        this.updatedAddress$.next(address);
      }

    changeUpdateAddress(address : Address) {
        this.updateAddress$.next(address);
   }
}