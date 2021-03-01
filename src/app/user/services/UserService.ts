import { Injectable } from '@angular/core';
import { UserDetail } from '../models/UserDetail';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  userDetail : UserDetail;
  private userDetail$ = new BehaviorSubject<UserDetail>(this.userDetail);
  currentUserDetail = this.userDetail$.asObservable();
 
  userInfo : UserInfo;
  private userInfo$ = new BehaviorSubject<UserInfo>(this.userInfo);
  currentUserInfo = this.userInfo$.asObservable();
 
  changeUserInfo(userInfo : UserInfo) {
    this.userInfo$.next(userInfo);
  }

  changeUserDetail(userDetail : UserDetail) {
    this.userDetail$.next(userDetail);
  }
}