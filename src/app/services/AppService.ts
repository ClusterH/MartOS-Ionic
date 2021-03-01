import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()

export class AppService {
    public isSideBarEnabled = new BehaviorSubject(false);
    public isFollowOrder = new BehaviorSubject(true);


    toggleSideBar() {
        this.isSideBarEnabled.next(!this.isSideBarEnabled.getValue());
    }

    toogleFollowOrder() {
      this.isFollowOrder.next(!this.isFollowOrder.value);
    }

}
