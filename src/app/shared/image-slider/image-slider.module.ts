import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider.component';



@NgModule({
  declarations: [ImageSliderComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [ImageSliderComponent]
})
export class ImageSliderModule { }
