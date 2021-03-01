import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap, MyLocation } from '@ionic-native/google-maps';
import { NavController } from '@ionic/angular';
import { Location } from '../../models/Location';
import { OnlineArticle } from '../../models/OnlineArticle';
import { MapsService } from '../../services/MapsService';
import { RemoveShoppingListRequest, ShoppingList, ShoppingListType, SingleShoppingList } from '../models/shopping-list.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { StoreItem } from '../../models/StoreItem';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
  private sub: any;
  shoppingListType = ShoppingListType;
  currentItem: ShoppingList;
  currentId: string;
  req: SingleShoppingList;
  locations: Location[] = [];
  myLocation: MyLocation;
  map: GoogleMap;

  constructor(
    private mapsService : MapsService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private backgroundGeolocation: BackgroundGeolocation,
    private router: Router,
    private shoppingListService: ShoppingListService
  ) { }
  async ionViewDidEnter() {
    console.log('init view list');
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        console.log(params['id']);
        this.currentId = params['id'];
        this.req = {
          country: 'France',
          id: params['id']
        };

      }
    });
    console.log('req', this.req);

    return new Promise(async (resolve) => {
    (await this.shoppingListService.getListByid(this.req)).subscribe((data: ShoppingList) => {
      resolve(data);
      this.currentItem = data;
    });
  });
  }

  ngOnInit() {
  }

  backClicked() {
    this.navCtrl.back();
  }

  editList() {
    this.router.navigateByUrl('tabs/shoppinglist/update-list/' + this.currentItem.id);
  }

  addToList(event: OnlineArticle) {
    this.shoppingListService.activeArticle.next(event);
    this.router.navigateByUrl('tabs/shoppinglist/add-to-list/' + event.id);
  }

  async goToLocation() {
      this.currentItem.onlineArticles.forEach(article =>{
      this.locations.push(article.location);
       });

       this.mapsService.changeGoListLocation(this.currentItem, this.locations,true);
       let mapRoute = '/tabs/shopnearby';
       this.router.navigate([mapRoute]);
  }

  async deleteArticle(event: OnlineArticle) {
    const request: RemoveShoppingListRequest = {
      country: 'France',
      itemId: event.itemId,
      articleId: event.id,
      refStoreId: event.refStoreId,
      id: this.currentItem.id,
      type: this.currentItem.type,
    };

    (await this.shoppingListService.removeArticleFromList(request)).subscribe(next => {
      console.log('delete')
      const oldArticleIndex = this.currentItem.onlineArticles.findIndex(x => x.id === event.id)
      this.currentItem.onlineArticles.splice(oldArticleIndex, 1);
    })
  }
}
