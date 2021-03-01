import { ProductService } from './../../services/ProductService';
import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { OnlineArticle } from '../../models/OnlineArticle';
import { ProductsDetailService } from '../../services/ProductsDetailService';
import { Slider } from '../../models/Slider';
import { SlideItem } from '../../models/SlideItem';
import { OnlineProductDetailClient } from '../../clients/OnlineProductDetailClient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit, OnDestroy  {

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;


  sliderOne: Slider;
  sliderTwo: any;
  sliderThree: any;
  public didInit: boolean = false;
  getDetailSubscription: Subscription;
  articleSubscription: Subscription;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
  };
  
  articleDetail: OnlineArticle;
  private readonly onlineProductDetailClient: OnlineProductDetailClient;
  private readonly productsDetailService: ProductsDetailService;
  constructor(
    private productService :ProductService,
    productsDetailService: ProductsDetailService,
    onlineProductDetailClient: OnlineProductDetailClient
  ) {
    this.onlineProductDetailClient = onlineProductDetailClient;
    this.productsDetailService = productsDetailService;
    //Item object for Nature
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };
  }
  
  ngOnInit() { 
    // this.slideWithNav.update
    this.sliderOne.slidesItems = [];
    
    return new Promise(async (resolve) => {
    this.getDetailSubscription = this.productsDetailService.currentGetDetailRequest.subscribe(async request => {
      if (!request) {
        return;
      }
     
      (await this.onlineProductDetailClient.GetDetail(request)).subscribe((products) => {
        resolve(products);
        this.sliderOne.slidesItems = [];
        this.productsDetailService.changeProductDetail(products); 
        this.articleDetail = products.onlineArticles[0];
        let count: number = 0;
        if (this.articleDetail.urls != []) {
          this.articleDetail.urls.forEach(url => {
            var itemSlide = <SlideItem> {
               id: count,
               src: url
             };
             
             this.sliderOne.slidesItems.push(itemSlide);
             count = count + 1;
             });              
        }
       });
      });

      this.articleSubscription = this.productsDetailService.currentArticle.subscribe(async article => {
        console.log({article});
        if (!article) {
          return;
        }

        this.articleDetail = article;
        let count: number = 0;
        this.sliderOne.slidesItems = [];
        let slidesList: SlideItem[] = [];
        this.articleDetail.urls.forEach(url => {
          var itemSlide = <SlideItem> {
            id: count,
            src: url
          };
          slidesList.push(itemSlide);
          //this.sliderOne.slidesItems.push(itemSlide);
          count = count + 1;
        });
        this.sliderOne.slidesItems = slidesList;
      });

     this.productService.activeImageSlide$.subscribe((activeSlide) => {
       if (activeSlide !== null) {
         this.slideWithNav.slideTo(activeSlide);
       }
     });
    });
  }

  ngOnDestroy() {
    if(this.getDetailSubscription){
      this.getDetailSubscription.unsubscribe();
    }

    if(this.articleSubscription){
      this.articleSubscription.unsubscribe();
    }
    
     this.productsDetailService.changeDetailRequest(null);
     this.productsDetailService.changeArticle(null);
  }
  
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }
}