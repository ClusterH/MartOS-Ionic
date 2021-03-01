import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Location } from '@angular/common';
import { UserInfo } from '../models/UserInfo';
import { UsersClient } from '../clients/UsersClient';
import { Subscription } from 'rxjs';
import { UserService } from '../services/UserService';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ImagePicker]
})
export class ProfileComponent implements OnInit, OnDestroy {
  userInfo: UserInfo;
  userInfoSubscription: Subscription;

  private readonly usersClient: UsersClient;
  constructor(private location: Location,
     private imagePicker: ImagePicker,
     usersClient: UsersClient,
     private userService: UserService) {
      this.usersClient = usersClient
      }

  backClicked() {
    this.location.back();
  }

  async ngOnInit() {
    this.userInfoSubscription = this.userService.currentUserInfo.subscribe(user => {
      if (!user) {
        return;
      }
      
      this.userInfo = user;
    });

    this.userInfo = <UserInfo>{
      email: "",
      lastName: "",
      name:"",
      phoneNumber: ""
    };
    
    return new Promise(async (resolve) => {
    (await this.usersClient.GetUserInfo()).subscribe((userInfo) => {
      resolve(userInfo);
      this.userInfo = userInfo
      console.log(this.userInfo)
    });
  });
  }

  getImage(){
    this.imagePicker.hasReadPermission().then(res=> {
      console.log(res);

      if(!res){
        this.imagePicker.requestReadPermission().then(res=>{
          console.log(res);
        })
      }
    })

    this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
  for (var i = 0; i < results.length; i++) {
      console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
    console.error(err);
    });
  }

  ngOnDestroy() {
    if(this.userInfoSubscription){
      this.userInfoSubscription.unsubscribe();
    }
    
     this.userService.changeUserInfo(null);
  }
}
