import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { UpdateFieldComponent } from './update-field/update-field.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes : Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "profile"
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "account",
    component: AccountComponent
  }
]

@NgModule({
  declarations: [UpdateFieldComponent,ProfileComponent,AccountComponent,UpdatePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
