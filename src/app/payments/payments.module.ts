import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardDetailsComponent } from './card-details/card-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards'
      },
      {
      path: 'cards',
      pathMatch: 'full',
      component: CardsComponent
    },
    {
      path: 'details',
      pathMatch: 'full',
      component: CardDetailsComponent
    }
    ]
  }
];


@NgModule({
  declarations: [CardDetailsComponent, CardsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentsModule { }
