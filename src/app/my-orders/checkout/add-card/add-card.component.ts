import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../services/CheckoutService';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {

  addCardForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    card: new FormControl('', [Validators.required, Validators.minLength(16)]),
    expiryDate: new FormControl(null, [Validators.required]),
    cvv: new FormControl(null, [Validators.required, Validators.max(999)]),
  });
  constructor(private router: Router, private checkoutService: CheckoutService) { }

  ngOnInit() { }

  saveCard() {
    if (!this.addCardForm.valid) {
      Object.keys(this.addCardForm.controls).forEach(field => {
        const control = this.addCardForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    // let cards = localStorage.getItem('cards');
    // if (cards) {
    //   cards = JSON.stringify(cards);
    //   localStorage.setItem('cards', JSON.stringify([...cards, this.addCardForm.value]))
    // } else {
    //   localStorage.setItem('cards', JSON.stringify([this.addCardForm.value]))
    // }
    this.addCardForm.get('id').setValue(this.checkoutService.paymentMethods.length + 1);
    this.checkoutService.paymentMethods.push(this.addCardForm.value);

    this.router.navigateByUrl('/my-orders/checkout');
  }

}
