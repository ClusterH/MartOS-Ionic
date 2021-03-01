import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { UserDetail } from '../models/UserDetail';
import { UsersClient } from '../clients/UsersClient';

function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  providers: [Keyboard]
})
export class UpdatePasswordComponent implements OnInit {

  formControl = this.formBuilder.group({
    password: ['', Validators.required],
    newpassword: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  }, {
      validator: ConfirmedValidator('password', 'confirmpassword')
    });

  constructor(private keyboard: Keyboard, 
    private formBuilder: FormBuilder, 
    public modalController: ModalController,
    private userClient: UsersClient) { }

  ngOnInit() { }
  async close(event){
    this.keyboard.hide();
  }
  async update() {
    let user = <UserDetail>{
      email: "",
      lastName: "",
      name: "",
      oldPassword: this.formControl.get('password').value,
      password: this.formControl.get('confirmpassword').value,
      phoneNumber:"",
      id :""
    };
    
    (await this.userClient.Update(user)).subscribe(resp =>{
    })

    if (this.formControl.valid) {
      this.modalController.dismiss()
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
