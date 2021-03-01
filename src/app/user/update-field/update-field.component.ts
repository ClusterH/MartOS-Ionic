import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { UsersClient } from '../clients/UsersClient';
import { UserDetail } from '../models/UserDetail';
import { UserService } from '../services/UserService';
import { Subscription } from 'rxjs';
import { UserInfo } from '../models/UserInfo';

@Component({
  selector: 'app-update-field',
  templateUrl: './update-field.component.html',
  styleUrls: ['./update-field.component.scss'],
  providers: [Keyboard]
})
export class UpdateFieldComponent implements OnInit, OnDestroy {

  @Input() field: string;
  @Input() value: string;

  actualUser: UserDetail;
  userDetailSubscription: Subscription;

  constructor(private keyboard: Keyboard, 
    public modalController: ModalController,
    private usersClient: UsersClient,
    private userService: UserService) { }

  ngOnInit() {
    this.userDetailSubscription = this.userService.currentUserDetail.subscribe(user => {
      if (!user) {
        return;
      }
      
      this.actualUser = user;
    });
  }

  ngOnDestroy() {
    if(this.userDetailSubscription){
      this.userDetailSubscription.unsubscribe();
    }
    
     this.userService.changeUserDetail(null);
  }
  
  dismissModal(){
    this.modalController.dismiss();
  }

  async close(event){
    this.keyboard.hide();
  }

  async update() {
    let user = <UserDetail>{
      email: "",
      lastName: "",
      name: "",
      password: "",
      phoneNumber:"",
      id :""
    };

    switch (this.field) {
      case "Last Name":
        user.lastName = this.value;
        this.actualUser.lastName = this.value;
        this.userService.changeUserDetail(this.actualUser);
        break;
      case "First Name":
        user.name = this.value;
        this.actualUser.name = this.value;
        this.userService.changeUserDetail(this.actualUser);
        break;
      case "Password":
        user.password = this.value;
        this.actualUser.password = this.value;
        this.userService.changeUserDetail(this.actualUser);
        break;
      case "Phone Number":
        user.phoneNumber = this.value;
        this.actualUser.phoneNumber = this.value;
        this.userService.changeUserDetail(this.actualUser);
        break;
      case "Email":
        user.email = this.value;
        this.actualUser.email = this.value;
        this.userService.changeUserDetail(this.actualUser);
        break;
                    
      default:
        break;
    }

    (await this.usersClient.Update(user)).subscribe(resp =>{
      let userInfo = <UserInfo>{
        email: this.actualUser.email,
        lastName: this.actualUser.lastName,
        name: this.actualUser.name,
        phoneNumber: this.actualUser.phoneNumber
      };

      this.userService.changeUserInfo(userInfo);
    })

    if(this.value){
      this.dismissModal()
    }
  }

}
