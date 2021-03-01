import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { Location } from '@angular/common';
import { CreateAccountRequest } from '../../requests/CreateAccountRequest';
import { IdentityClient } from '../clients/IdentityClient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerFormControl = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

private readonly identityClient: IdentityClient; 
  constructor(private location: Location, identityClient: IdentityClient,
    private router: Router) { 
    this.identityClient = identityClient;
  }

  backClicked() {
    this.location.back();
  }

  ngOnInit() {}
  async register(){
    if(this.registerFormControl.valid){
      let register = this.registerFormControl.getRawValue();
      console.log(request);
      var request = <CreateAccountRequest>
        {
          user: <User>{
            email: register.email,
            password: register.password,
            country: "France"
          }
        };

        console.log(request);
        (await this.identityClient.CreateAccount(request)).subscribe(async val => {
          console.log(val);
        });
    
        this.router.navigateByUrl('/auth');
    }
    this.registerFormControl.markAsTouched();
  }
}
