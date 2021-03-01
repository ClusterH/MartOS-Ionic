import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardsClient } from '../clients/CardsClient';
import { CreatePaymentRequest } from '../models/CreatePaymentRequest';
import { CardService } from '../services/CardService';
import { CardInfo } from '../models/CardInfo';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  public cardDetailsForm: FormGroup;
  get control() {
    return this.cardDetailsForm.controls;
  }
  sub: any;
  id = 0;
  constructor(private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cardsClient: CardsClient,
    private cardsService: CardService) { }

  ngOnInit() {
    this.initForm();
    this.sub = this.route.params.subscribe(params => {

      if (params.id && +params.id >= 0) {
        this.id = params.id;
        const value = this.cardsService.cardInfos.find(x => x.id === params.id);
        this.cardDetailsForm.patchValue(value);
      }

    });
  }

  initForm() {
    this.cardDetailsForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      isEnabled: [false]
    });
  }
  
  async updateCard() {
    if (this.id=== 0) {
      const expiry = this.cardDetailsForm.get('expiryDate').value;
      const month = expiry.split('-')[1];
      const year = expiry.split('-')[0];
      const request: CreatePaymentRequest = {
        country: "France",
        isEnabled: this.cardDetailsForm.get('isEnabled').value,
        cardDetails: {
          card: {
            id: '',
            cvc: String(this.cardDetailsForm.get('cvv').value),
            expiryMonth: month,
            expiryYear: year,
            holderName: this.cardDetailsForm.get('firstName').value,
            number: String(this.cardDetailsForm.get('cardNumber').value),
            type: 'classic'
          }
        }
      };

      (await this.cardsClient.Create(request)).subscribe(async (val) => {
        this.cardsService.changeReloadInfos("reload");
        if (request.isEnabled == true) {
          this.cardsService.changeNewEnabledCard("newEnabled") 
        }
        this.location.back();
       });
    }
  }

  backClicked() {
    this.location.back();
  }
}
