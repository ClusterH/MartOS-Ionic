import { Component, OnInit } from '@angular/core';
import { MyLocation, GoogleMap } from '@ionic-native/google-maps';
import { GetByLocationRequest } from '../../requests/GetByLocationRequest';
import { ArticleData } from '../../models/ArticleData';
import { UserCoordinates } from '../../models/UserCoordinates';
import { MapsService } from '../../services/MapsService';
import { ArticlesClient } from '../../clients/ArticlesClient';

@Component({
  selector: 'app-articlesSearch',
  templateUrl: 'articlesSearch.page.html',
  styleUrls: ['articlesSearch.page.scss']
})

export class ArticlesSearchPage {
  searchName: string = "";
  map: GoogleMap;
  myLocation:  MyLocation;
  request: GetByLocationRequest;
  articleDatas: ArticleData[] = [];
  actualUserCoordinates: UserCoordinates;

  private readonly mapsService : MapsService;
  private readonly articlesClient : ArticlesClient;
  constructor(articlesClient : ArticlesClient,
    mapsService : MapsService) {
    this.articlesClient = articlesClient;
    this.mapsService = mapsService;
  }

  async goToMyLocation() {
    this.map = this.mapsService.loadMap();
    this.map.clear();
    await this.map.getMyLocation().then((location: MyLocation) => {
      this.myLocation = location;
    });

    let userCoordinates = <UserCoordinates>
    {    
      longitude: this.myLocation.latLng.lng,
      latitude: this.myLocation.latLng.lat,
      country: "France"
    }
    this.request = <GetByLocationRequest>
    {
      userCoordinates : userCoordinates,
      search: this.searchName,
      country :"",
      skip:5,
      take:4
    };

    (await this.articlesClient.Search(this.request)).subscribe(val => {
      this.articleDatas = val;
      this.buildAllTag(val);
     });
  }

  buildAllTag(articleDatas: ArticleData[])
  { 
    articleDatas.forEach(articleData => {
      articleData.allProductTypes = "";
        articleData.categories.forEach(category => {
          articleData.allProductTypes = `${articleData.allProductTypes} ${category.value}`;           
        });
    });

    articleDatas.forEach(articleData => {
      articleData.allOptions = "";
      articleData.Options.forEach(option => {
        articleData.allOptions = `${articleData.allOptions} ${option.value}`;
      });
    });
  }

  async search(){
    this.goToMyLocation();
  }
}
