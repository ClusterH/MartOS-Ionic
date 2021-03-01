import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ShoppingList, ShoppingListType, SingleShoppingList, UpdateShoppingListRequest } from '../models/shopping-list.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-create-edit-list',
  templateUrl: './create-edit-list.component.html',
  styleUrls: ['./create-edit-list.component.scss']
})
export class CreateEditListComponent implements OnInit {
  private sub: any;
  ListForm: FormGroup;
  req: SingleShoppingList;
  currentId = '';
  constructor(private navCtrl: NavController, private route: ActivatedRoute, private shoppingListService: ShoppingListService) { }

  async ngOnInit() {
    this.ListForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl(ShoppingListType.NotPermanent),
      country: new FormControl('France'),
      shoppingListType: new FormControl(false)
    });
    this.ListForm.get('shoppingListType').valueChanges.subscribe(next => {
      this.ListForm.get('type').setValue(next ? ShoppingListType.Permanent : ShoppingListType.NotPermanent);
    })
     this.sub = this.route.params.subscribe(params => {
       if (params['id']) {
         this.currentId = params['id'];
       }
     });
  }

  async submitForm() {
    if (this.currentId !== '') {
      const request: UpdateShoppingListRequest = {
        country: 'France',
        id: this.currentId,
        name: this.ListForm.value.name,
        type: this.ListForm.value.type
      };

      return new Promise(async (resolve) => {
      (await this.shoppingListService.updateShoppingList(request)).subscribe(shoppingList => {
        resolve(shoppingList);

        this.shoppingListService.changeUpdatedShoppingList(shoppingList);
        this.navCtrl.back();
      });
    });
    } else {
    return new Promise(async (resolve) => {
      (await this.shoppingListService.createNewShoppingList(this.ListForm.value)).subscribe(shoppingList => { 
        resolve(shoppingList);

        this.shoppingListService.changeShoppingList(shoppingList);
        this.navCtrl.back();
      });
    });
    }
  }

  backClicked() {
    this.navCtrl.back();
  }
}
