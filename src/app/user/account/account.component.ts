import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateFieldComponent } from '../update-field/update-field.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { UsersClient } from '../clients/UsersClient';
import { UserInfo } from '../models/UserInfo';
import { UserService } from '../services/UserService';
import { UserDetail } from '../models/UserDetail';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {

  user: UserInfo;
  userDetailSubscription: Subscription;
  userDetail: UserDetail;
  
  constructor(public modalController: ModalController,
    private usersClient: UsersClient,
    private userService: UserService) { }

  async ngOnInit() { 
    this.userDetailSubscription = this.userService.currentUserDetail.subscribe(user => {
      if (!user) {
        return;
      }

      this.user = <UserInfo>{
        email: user.email,
        lastName: user.lastName,
        name: user.name,
        phoneNumber: user.phoneNumber
      };
    });

    this.user = <UserInfo>{
      email: "",
      lastName: "",
      name:"",
      phoneNumber: ""
    };

    return new Promise(async (resolve) => {
    (await this.usersClient.GetUserInfo()).subscribe((user) => {
      resolve(user);
      this.user =  user;
      this.userDetail = <UserDetail> {
        email: user.email,
        lastName: user.lastName,
        name: user.name,
        phoneNumber: user.phoneNumber
      };

      this.userService.changeUserDetail(this.userDetail);
    });
  });
  }

  ngOnDestroy() {
    if(this.userDetailSubscription){
      this.userDetailSubscription.unsubscribe();
    }
    
     this.userService.changeUserDetail(null);
  }

  async presentModal(field, value) {
    const modal = await this.modalController.create({
      component: UpdateFieldComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        field, value
      }
    });

    this.userService.changeUserDetail(this.userDetail);
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentPasswordModal() {
    const modal = await this.modalController.create({
      component: UpdatePasswordComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
}
