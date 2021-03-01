import { ProductOptionsService } from '../../services/ProductOptionsService';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OnlineProductDetail } from '../../models/OnlineProductDetail';
import { OnlineArticle } from '../../models/OnlineArticle';
import { ProductsDetailService } from '../../services/ProductsDetailService';
import { Option } from '../../models/Option';
import { OptionVM } from '../../models/OptionVM';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss'],
})
export class ProductOptionsComponent implements OnInit, OnDestroy {
  public colors = [{ id: 0, value: 'red' }, { id: 1, value: 'white' }, { id: 2, value: 'green' }, { id: 3, value: 'blue' }];
  public options: OptionVM[] = [];
  public activeColor = '';
  public filters: Array<{ name: string, value: string }> = [];
  maincolors:any[]=[];
  mainoptions:OptionVM[]=[];
  @Output('appliedFilters') appliedFilters = new EventEmitter();

  colorVisible: boolean = false;
  productDetail: OnlineProductDetail;
  articleDetail: OnlineArticle;
  actualOption: Subscription;
  currentProduct: Subscription;
  private readonly productOptionsService: ProductOptionsService;
  private readonly productsDetailService: ProductsDetailService;
  constructor(productOptionsService: ProductOptionsService,
    productsDetailService: ProductsDetailService) {
    this.productsDetailService = productsDetailService;
    this.productOptionsService = productOptionsService;
  }

  ngOnInit() {
    console.log('this.filters', this.filters);
    this.actualOption = this.productsDetailService.currentActualOptions.subscribe(async actualOption => {
      if (!actualOption || actualOption == null) {
        return;
      }
      this.options = actualOption;
      var colors = this.options.filter(x => x.name == "color");

      let count: number = 0;
      this.colors = [];
      colors.forEach(color => {
        color.values.forEach(value => {
          var colorToAdd = { id: count, value: value.value.toLowerCase() };
          this.colors.push(colorToAdd);
          count = count + 1;
        });
      });

      let orderedOptions: string[] = [];
      this.productDetail.optionValues.forEach(option => {
        if (option.name != "color") {
          orderedOptions.push(option.name)
        }
      });

      let options: OptionVM[] = [];
      actualOption.forEach(actual => {
        if (actual.name != "color") {
          options.push(actual)
          console.log({ actual });
          // this.changeSize()
        }
      });

      let allOptions: OptionVM[] = this.options;
      this.options = [];
      orderedOptions.forEach(optionName => {
        var option = allOptions.filter(x => x.name == optionName)[0];
        this.options.push(option);

      });
    });

    this.currentProduct = this.productsDetailService.currentProductDetail.subscribe(async product => {
      if (!product) {
        return;
      }

      this.options = [];
      this.productDetail = product;
      this.articleDetail = product.onlineArticles[0];

      product.optionValues.forEach(option => {
        if (option.name == "color") {
          this.colorVisible = true;
          this.colors = [];
          option.values.forEach((value, index) => {
            var color = { id: index, value: value.toLowerCase() };
            this.colors.push(color);
          });
          if(this.maincolors.length===0){
            this.maincolors = [...this.colors];
          }
          if (option.values.length === 1) {
            this.onSelectColor(0, true);
          } else {

          }
        } else {
          var optionVm = <OptionVM>{
            name: option.name,
            values: []
          }

          option.values.forEach(value => {
            let randomOption = <Option>{
              name: option.name,
              value: value
            };
            console.log({ randomOption });
            optionVm.values.push(randomOption);
          });


          this.options.push(optionVm);
          console.log('this.options', this.options);
          this.options.forEach(option => {
            if (option.values.length === 1) {
              console.log(option.values[0]);
              this.changeSize(option.values[0]);
            }
          })
        }
      });
      if(this.mainoptions.length===0){
        this.mainoptions = [...this.options];
      }
    });
  }

  onSelectColor(id, stopFilter?) {
    let actualColor = <Option>{
      name: "color"
    };

    this.colors.forEach(color => {
      if (color.id == id) {
        actualColor.value = color.value;
      }
    });
    // this.colors.filter(x=>x.id ===id);
    const index = this.filters.findIndex(item => item.name == "color")
    if (index == -1) {
      this.filters.push(actualColor);
    } else {
      this.filters.splice(index, 1, actualColor);
    }
    this.appliedFilters.emit(this.filters);
    if (!stopFilter) {
      this.productOptionsService.selectItem(actualColor, this.productDetail);
      this.options.forEach(option => {
        if (option.values.length === 1) {
          console.log(option.values[0]);
          this.changeSize(option.values[0]);
        }
      });
    }
    this.activeColor = actualColor.value;

    //this.productService.updateActiveImageSlide(id);
  }

  selectColor(color) {

  }

  changeSize(event, stopFilter?) {
    console.log({ event });
    const index = this.filters.findIndex(item => item.name === event.name);
    if (index === -1) {
      this.filters.push(event);
    } else {
      this.filters.splice(index, 1, event);
    }

    if (!stopFilter) {
      if (this.colors.length === 1) {
        this.onSelectColor(0, true);
        console.log(this.activeColor);
      };
      this.options.forEach(option => {
        if (option.values.length === 1) {
          console.log(option.values[0]);
          if (event !== option.values[0]) {
            this.changeSize(option.values[0],true);
          }
        }
      });
      console.log('filters', this.filters);
      this.appliedFilters.emit(this.filters);
    }
  }

  ngOnDestroy() {
    // this.activeColor='';
    if (this.actualOption) {

      this.actualOption.unsubscribe();
      this.productsDetailService.changeActualOptions(null);
    }
    if (this.currentProduct) {
      this.currentProduct.unsubscribe();
      this.productsDetailService.changeProductDetail(null);
    }
  }
}
