import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/ConfigService';
import { UserInfo } from '../models/UserInfo';
import { UserDetail } from '../models/UserDetail';

@Injectable({
  providedIn: 'root'
})

export class UsersClient {
    userUrl:string;

    private configService: ConfigService;
  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
      this.configService = configService;
      this.userUrl = `${this.configService.onlineUserURI}/User`;
    }

  public async GetUserInfo(){
    let header = await this.configService.buildHeader();
    console.log(header)
    //alert('header');
    return await this.httpClient.get<UserInfo>(`${this.userUrl}/info`, {
        headers: header
      });
  }
  
  public async Update(user: UserDetail){
    let header = await this.configService.buildHeader();
    return await this.httpClient.post<any>(`${this.userUrl}`, user, {
        headers: header
      });
  }

  public async GetAddress(){
    let header = await this.configService.buildHeader();
    return await this.httpClient.get<UserDetail>(`${this.userUrl}/address`, {
        headers: header
      });
  }
}