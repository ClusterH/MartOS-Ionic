import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { IonicModule } from '@ionic/angular';
import { AddressComponent } from './address.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'address-list'
      },
      {
        path: 'address-list',
        component: AddressListComponent
      },
      {
        path: 'add',
        component: AddAddressComponent
      },
      {
        path: 'edit/:id',
        component: AddAddressComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddressComponent, AddressListComponent, AddAddressComponent]
})
export class AddressModule { }
