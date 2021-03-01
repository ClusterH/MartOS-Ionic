import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OnlineProductsService } from '../../services/OnlineProductsService';
import { GetBySubCategoryRequest } from '../../requests/GetBySubCategoryRequest';
import { UserCoordinates } from '../../models/UserCoordinates';
import { OnlineProductClient } from '../../clients/OnlineProductClient';
import { GetLatestsRequest } from '../../requests/GetLatestsRequest';
import { LiveLocationService } from '../../services/LiveLocationService';

@Component({
  selector: 'app-overflowable',
  templateUrl: './overflowable.component.html',
  styleUrls: ['./overflowable.component.scss'],
})
export class OverflowableComponent implements OnInit {
  @Input() options;
  @Input() children;
  @Input() hasChips;
  @Output() onChangeSelection = new EventEmitter();

  subRequest: GetBySubCategoryRequest;
  public activeSlide = 0;
  private readonly onlineProductClient: OnlineProductClient;
  private readonly onlineProductsService: OnlineProductsService;
  constructor(onlineProductsService: OnlineProductsService,
    onlineProductClient: OnlineProductClient,
    private liveLocationService: LiveLocationService) { 
    this.onlineProductsService = onlineProductsService;
    this.onlineProductClient = onlineProductClient;
  }

  ngOnInit() {
  }
  onDrag(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  async getLatestItems(skip: number, take: number) {
    return new Promise(async (resolve) => {

      let location = await this.liveLocationService.getLocation();
      resolve(location);
      let userCoordinates = <UserCoordinates>
      {    
        longitude: location.lng,
        latitude: location.lat,
        country: "France"
      };

      let request = <GetLatestsRequest>
      {
        userCoordinates : userCoordinates,
        country :"France",
        skip: skip,
        take: take
      };
      
      this.onlineProductsService.changeSubCategory("all");
      (await this.onlineProductClient.GetLatests(request)).subscribe((products) => {
        resolve(products);
        this.onlineProductsService.changeSubProducts(products);
      });
  });
  }

  async loadProductsBySubCategory(SubCategoryName: string,skip: number, take: number) {
    if (SubCategoryName == "all") {
      this.getLatestItems(skip, take)
      return;
    }

    return new Promise(async (resolve) => {
      let location = await this.liveLocationService.getLocation();
      resolve(location);
      let userCoordinates = <UserCoordinates>
      {    
        longitude: location.lng,
        latitude: location.lat,
        country: "France"
      }
  
      this.subRequest = <GetBySubCategoryRequest>
      {
        userCoordinates : userCoordinates,
        SubCategoryName: SubCategoryName,
        country: "France",
        skip: skip,
        take: take
      };

      this.onlineProductsService.changeSubCategory(SubCategoryName);
      (await this.onlineProductClient.GetbySubcategory(this.subRequest)).subscribe((products) => {
        resolve(products);
        this.onlineProductsService.changeSubProducts(products);
      });
  });
  }

  async selectItem(item, index) { 
    console.log(item, index);
    await this.loadProductsBySubCategory(item.name, 0, 4)
    this.onChangeSelection.emit(item);
    this.activeSlide = index;
  }
}
