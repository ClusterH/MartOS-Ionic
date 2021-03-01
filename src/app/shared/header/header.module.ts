import { BaseHeaderComponent } from './components/base-header/base-header.component';
import { AppService } from './../../services/AppService';
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductHeaderComponent,
    MainHeaderComponent,
    BaseHeaderComponent,
    NavigationHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
    
  ],
  exports: [HeaderComponent],
  providers: [AppService]
})
export class HeaderModule { }
