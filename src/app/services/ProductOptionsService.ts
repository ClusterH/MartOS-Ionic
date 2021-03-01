
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { OnlineProductDetail } from '../models/OnlineProductDetail';
import { OnlineArticle } from '../models/OnlineArticle';
import { OptionVM } from '../models/OptionVM';
import { Option } from '../models/Option';
import { ProductsDetailService } from './ProductsDetailService';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
export class ProductOptionsService implements OnInit, OnDestroy {
  
    public actualOptions: OptionVM[] = [];
    public optionsVms: OptionVM[] = [];
    public chosenOptions: Option[] = [];
    public activeSlide = 0;

    productDetailSubscription: Subscription;

    private readonly productsDetailService: ProductsDetailService;
    constructor(productsDetailService: ProductsDetailService,) {
      this.productsDetailService = productsDetailService;
    }
  
    ngOnInit() {
        this.productDetailSubscription = this.productsDetailService.currentProductDetail.subscribe(async product => {
          if (!product) {
            return;
          }
          this.chosenOptions = [];
          this.actualOptions = [];
          this.optionsVms = [];
        });
      }

      ngOnDestroy(){
        if(this.productDetailSubscription){
          this.productDetailSubscription.unsubscribe();
        }
        
         this.productsDetailService.changeProductDetail(null);
      }

      async selectItem(clickedOption, product:OnlineProductDetail) {
          for (let index = 0; index < this.chosenOptions.length; index++) {
              const chosenOption = this.chosenOptions[index];
              
              if (chosenOption.name == clickedOption.name) {
                this.chosenOptions.splice(index, 1);
            }
          }
          
          this.chosenOptions.push(clickedOption);
          let chosenArticle: OnlineArticle;

        this.actualOptions =[];
        this.optionsVms = [];
        product.optionValues.forEach(optionValues => {
          if (optionValues.name == clickedOption.name) {
              var optionVm = <OptionVM>{
                name: optionValues.name,
                values: []
              };
              optionValues.values.forEach(value => {
                var option = <Option>{
                  name: optionValues.name,
                  value: value
                }
                optionVm.values.push(option);
              });
              this.actualOptions.push(optionVm);
          } else {
            var optionVm = <OptionVM>{
              name: optionValues.name,
              values: []
            };
            
            this.actualOptions.push(optionVm);
          }  
        });

        this.actualOptions = [];

        let articlesAvailable: OnlineArticle[] = [];
        let chosenCount: number = this.chosenOptions.length;
        product.onlineArticles.forEach(article => {
        let matchCount: number = 0;
        let notMatchFounds: Option[] = [];
        let clickedMatch: number = 0;
          article.options.forEach(option => {
            if (option.name == clickedOption.name && 
                option.value == clickedOption.value) {
                  clickedMatch = 1;
              }
              this.chosenOptions.forEach(chosenOption => {

                if (chosenOption.name == option.name && 
                  chosenOption.value == option.value) {
                    matchCount = matchCount + 1;
                } else {
                    notMatchFounds.push(option)
                }
              });
            });

            if (matchCount > 0 && matchCount < chosenCount && clickedMatch == 1) {
                notMatchFounds.forEach(match => {
                    for (let index = 0; index < this.chosenOptions.length; index++) {
                        const chosenOption = this.chosenOptions[index];
                        if (chosenOption.name == match.name) {
                          this.chosenOptions.splice(index, 1);
                      }
                    }
                });
                
                articlesAvailable.push(article);
                if (chosenArticle == null || chosenArticle == undefined) {
                    chosenArticle = article;
                }
            }

            if (chosenCount == matchCount) {    
                articlesAvailable.push(article);                    
                chosenArticle = article;
            }
          });
    
          this.optionsVms = [];
            articlesAvailable.forEach(article => {
            this.buildOptionsPossibilities(article, clickedOption);
            }); 
    
        var actualClicked = product.optionValues.filter(x => x.name == clickedOption.name);
        if (actualClicked.length > 0) {
          actualClicked.forEach(optionClicked => {
            var optionToAdd = <OptionVM> {
              name: optionClicked.name,
            };
            
            let values : Option[] = [];
            optionToAdd.values = values;
            
            optionClicked.values.forEach(optionCli => {
              let option = <Option> {
                name: optionClicked.name,
                value: optionCli
              }
            
              optionToAdd.values.push(option);
            });
            this.optionsVms.push(optionToAdd);
          });
        }
        this.productsDetailService.changeActualOptions(this.optionsVms);
        chosenArticle.itemId = product.itemId;
        chosenArticle.refStoreId = product.referenceId;
        this.productsDetailService.changeArticle(chosenArticle);
        console.log(chosenArticle)
      }
    
      buildOptionsPossibilities(article: OnlineArticle, clickedOption){
            article.options.forEach(option => { 
            if (clickedOption.name != option.name) {
            if (this.optionsVms.length > 0) {
                this.populateOptions(option)
                } else {
            var optionToAdd = <OptionVM> {
                name: option.name,
            };
            
            let values : Option[] = [];
            optionToAdd.values = values;
            optionToAdd.values.push(option);
            this.optionsVms.push(optionToAdd);
            }
          }
        });
      }
    
      populateOptions(option: Option){
        let isInList: number = 0;
        this.optionsVms.forEach(optionVm => {
          if (optionVm.name == option.name) {
            optionVm.values.push(option);
            isInList = 1;
          }
        }); 
    
          if (isInList == 0) {
            var optionToAdd = <OptionVM> {
              name: option.name,
            };
    
            let values : Option[] = [];
            optionToAdd.values = values;
            optionToAdd.values.push(option);
            this.optionsVms.push(optionToAdd);
          }
      }
}