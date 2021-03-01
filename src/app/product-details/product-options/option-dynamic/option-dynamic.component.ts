import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProductsDetailService } from '../../../services/ProductsDetailService';
import { OnlineArticle } from '../../../models/OnlineArticle';
import { Option } from '../../../models/Option';
import { OptionVM } from '../../../models/OptionVM';
import { OnlineProductDetail } from '../../../models/OnlineProductDetail';
import { ProductOptionsService } from '../../../services/ProductOptionsService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-option-dynamic',
  templateUrl: './option-dynamic.component.html',
  styleUrls: ['./option-dynamic.component.scss'],
})
export class OptionDynamicComponent implements OnInit, OnDestroy {
  @Input() options;
  @Input() children;
  @Input() hasChips;
  @Input() selectedOptions;
  @Output() onChangeSelection = new EventEmitter();

  productDetailSubscription: Subscription;
  
  public actualOptions: OptionVM[] = [];
  public optionsVms: OptionVM[] = [];
  public articles: OnlineArticle[] = [];
  public product: OnlineProductDetail;
  public chosenOptions: Option[];
  public activeSlide = null;
  private readonly productsDetailService: ProductsDetailService;
  private readonly productOptionsService: ProductOptionsService;
  constructor(productsDetailService: ProductsDetailService,
    productOptionsService: ProductOptionsService) {
    this.productsDetailService = productsDetailService;
    this.productOptionsService = productOptionsService;
  }

  ngOnInit() {
    console.log('haschips', this.hasChips);
    console.log(this.selectedOptions);
    console.log(this.selectedOptions.filter(opt => opt.name === this.children.name));
    if (this.productOptionsService && this.productOptionsService.chosenOptions && this.productOptionsService.chosenOptions.length > 0) {
      this.chosenOptions = this.productOptionsService.chosenOptions;
      this.children.map((elemnt, index) => {
        if (elemnt.value == this.chosenOptions[0].value) {
          this.activeSlide = index
        }
      })

    }
    this.productDetailSubscription = this.productsDetailService.currentProductDetail.subscribe(async product => {
      if (!product) {
        return;
      }
      this.product = product;
      this.articles = product.onlineArticles;
    });
  }

  ngOnDestroy(){
    if(this.productDetailSubscription){
      this.productDetailSubscription.unsubscribe();
    }
    
    this.productsDetailService.changeProductDetail(null);
  }

  onDrag(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  activeSize(cat) {
    let cssclass = '';
    // console.log({ cat });
    // console.log('this.children', this.children);
    const index = this.selectedOptions.findIndex(x => x.value === cat.value);
    // console.log(index);
    if (index > -1) {
      cssclass = 'active';
    }else{
      cssclass = '';
    }
    return cssclass;
  }

  async selectItem(clickedOption, index) {
    console.log(clickedOption);
    this.activeSlide = index;
    this.productOptionsService.selectItem(clickedOption, this.product);
    this.onChangeSelection.emit(clickedOption);
  }
}
