import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthLogin } from './auth.login';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private readonly router : Router;
  constructor(
    private authService: AuthLogin,
    private storage: Storage,
    router : Router
    ) { 
      this.router = router;
    }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    //this.authService.logout();

    //let token = await this.authService.buildHeaderRequest();
    // var isSuccess =this.authService.isAuth();
    // if (!isSuccess) {
    //   let callbackLinkRoute = '/welcome';
    //   this.router.navigate([callbackLinkRoute]);
    // }

     return true;
  }
}
