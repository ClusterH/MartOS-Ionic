
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnlineArticle } from '../models/OnlineArticle';
import { Cart } from '../models/Cart';
import { DeliveryRider } from '../models/DeliveryRider';
import { UpdateDeliveryStepMessage } from '../models/UpdateDeliveryStepMessage';
import { UpdateDeliveryLocationMessage } from '../models/UpdateDeliveryLocationMessage';
import { CloseDeliveryMessage } from '../models/CloseDeliveryMessage';
import { DeliveryExistResponse } from '../requests/DeliveryExistResponse';

@Injectable({
    providedIn: 'root'
  })
  
export class DeliveryOrdersService {
  deliveryRider : DeliveryRider;
  public deliveryRider$ = new BehaviorSubject<DeliveryRider>(this.deliveryRider);
  currentdeliveryRider = this.deliveryRider$.asObservable();
 
  updateDeliveryStep : UpdateDeliveryStepMessage;
  public deliveryStep$ = new BehaviorSubject<UpdateDeliveryStepMessage>(this.updateDeliveryStep);
  currentDeliveryStep = this.deliveryStep$.asObservable();
 
  updateDeliveryLocation : UpdateDeliveryLocationMessage;
  public deliveryLocation$ = new BehaviorSubject<UpdateDeliveryLocationMessage>(this.updateDeliveryLocation);
  currentDeliveryLocation = this.deliveryLocation$.asObservable();

  closeDeliveryMessage : CloseDeliveryMessage;
  public closeDeliveryMessage$ = new BehaviorSubject<CloseDeliveryMessage>(this.closeDeliveryMessage);
  currentCloseDeliveryMessage = this.closeDeliveryMessage$.asObservable();

  deliveryExist : DeliveryExistResponse;
  public deliveryExist$ = new BehaviorSubject<DeliveryExistResponse>(this.deliveryExist);
  currentDeliveryExist = this.deliveryExist$.asObservable();

  changeDeliveryRider(rider : DeliveryRider) {
    this.deliveryRider$.next(rider);
  }

  changeDeliveryExistResponse(exist : DeliveryExistResponse) {
    this.deliveryExist$.next(exist);
  }

  changeDeliveryStep(step : UpdateDeliveryStepMessage) {
    this.deliveryStep$.next(step);
  }

  changeDeliveryLocation(location : UpdateDeliveryLocationMessage) {
    this.deliveryLocation$.next(location);
  }

  changeCloseDelivery(closedel : CloseDeliveryMessage) {
    this.closeDeliveryMessage$.next(closedel);
  }
}