import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FollowMyOrderComponent} from './follow-my-order.component';
import { OrderDetailComponent} from './order-detail/order-detail.component';
import { MapViewPageModule } from '../components/mapView/mapView.module';
import { CallNumber } from '@ionic-native/call-number/ngx';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: FollowMyOrderComponent},
  {path: ':id', component: OrderTrackingComponent}
]


@NgModule({
  declarations: [FollowMyOrderComponent, OrderDetailComponent, OrderTrackingComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule.forChild(routes),
    MapViewPageModule
  ],
  providers: [
    CallNumber
  ]
})
export class FollowMyOrderModule { }
