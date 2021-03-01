import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginFormControl = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private location: Location, private router: Router) { }

  ngOnInit() {}
  
  backClicked() {
    this.location.back();
  }

  login(){
    if(!this.loginFormControl.valid){
      return
    }
    this.router.navigateByUrl('tabs/home');
    this.loginFormControl.markAsTouched();
  }

}
