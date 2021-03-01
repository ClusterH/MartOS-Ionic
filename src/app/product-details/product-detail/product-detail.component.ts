import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsDetailService } from '../../services/ProductsDetailService';
import { Router } from '@angular/router';
import { OnlineArticle } from '../../models/OnlineArticle';
import { CartService } from '../../services/CartService';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { AddArticleToListRequest, ShoppingListType } from 'src/app/shopping-list/models/shopping-list.model';
import { MapsService } from '../../services/MapsService';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() InnerContent = false;
  @Input() InsidePopup=false;
  @Output() SlideDown:EventEmitter<any>=new EventEmitter<any> ();
  public activeTab: 'DESCRIPTION' | 'OPTIONS' | 'REVIEWS';
  public filters: Array<any> = [];
  public productPrize: string;
  public leftArticle: number;
  initilaProduct;
  chosenArticle: OnlineArticle;
  currentProduct: OnlineArticle;

  productDetailSubscription: Subscription;
  articleSubscription: Subscription;

  private readonly cartService: CartService;
  private readonly productsDetailService: ProductsDetailService;
  private readonly router: Router
  constructor(
    productsDetailService: ProductsDetailService,
    router: Router,
    cartService: CartService,
    private viewCtrl: ModalController,
    private shoppingListService: ShoppingListService,
    private mapsService: MapsService
  ) {
    this.router = router;
    this.productsDetailService = productsDetailService;
    this.cartService = cartService;
  }

  ngOnInit() {
    console.log('product detail init');
    this.productDetailSubscription = this.productsDetailService.currentProductDetail.subscribe(async products => {
      console.log(products);
      if (products && products.onlineArticles) {
        this.initilaProduct = products;
        this.currentProduct = products.onlineArticles[0];
        this.currentProduct.name = products.name;
        this.currentProduct.refStoreId = products.referenceId;
        this.currentProduct.storeName = products.storeName;
        this.currentProduct.itemId = products.itemId;
        this.currentProduct.location = products.location;
        this.productPrize = products.onlineArticles[0] && products.onlineArticles[0].price;
        this.leftArticle = products.onlineArticles[0] && products.onlineArticles[0].totalStock;
      }
    });

    this.articleSubscription = this.productsDetailService.currentArticle.subscribe(async article => {
      if (!article) {
        return;
      }

      this.chosenArticle = article;
      this.chosenArticle.name = this.initilaProduct.name;
      this.chosenArticle.refStoreId = this.initilaProduct.referenceId;
      this.chosenArticle.storeName = this.initilaProduct.storeName;
      this.chosenArticle.itemId = this.initilaProduct.itemId;
      this.chosenArticle.location = this.initilaProduct.location;
      this.productPrize = article.price;
      this.leftArticle = article.totalStock;
    });
    this.activeTab = 'OPTIONS';
  }

  ngOnDestroy() {
    if (this.productDetailSubscription) {
      this.productDetailSubscription.unsubscribe();
    }

    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }

    this.productsDetailService.changeProductDetail(null);
    this.productsDetailService.changeArticle(null);
  }

  selectTab(tab) {
    this.activeTab = tab
  }

  changeFilters($event) {
    this.filters = $event;
  }

  addToCard() {
    console.log(this.chosenArticle);
    let checkoutLinkRoute = '/my-orders/cart';
    this.router.navigate([checkoutLinkRoute]);
    if (this.chosenArticle != null || this.chosenArticle != undefined) {
      this.chosenArticle.countOnBuy = 1;
      this.cartService.changeCartArticle(this.chosenArticle);
    } else {
      this.currentProduct.countOnBuy = 1;
      this.cartService.changeCartArticle(this.currentProduct);
    }
  }
  
  addToList() {
    console.log(this.currentProduct);
    this.viewCtrl.dismiss({
      'dismissed': true
    });
    this.shoppingListService.activeArticle.next(this.chosenArticle?this.chosenArticle:this.currentProduct);
    this.router.navigateByUrl('tabs/shoppinglist/add-to-list/' + this.currentProduct.itemId);
  }

  async addToFavorites(){
    const request: AddArticleToListRequest = { country: 'France', id: null, type: ShoppingListType.favorites, onlineArticle: this.chosenArticle?this.chosenArticle:this.currentProduct };
    (await this.shoppingListService.addArticleToList(request)).subscribe(next => {
      console.log({ next });
    });
  }

  async goToProduct(){
  if(this.InsidePopup){
    this.viewCtrl.dismiss({
      'dismissed': true,
      'slideDown':true
    });
    this.mapsService.changePopUpGoProducts(this.currentProduct, false);
  }else{
    this.mapsService.changePopUpGoProducts(this.currentProduct,true);
    let mapRoute = '/tabs/shopnearby';
    this.router.navigate([mapRoute]);
  }
  }
}
