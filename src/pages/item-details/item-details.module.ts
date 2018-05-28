import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsPage } from './item-details';
import {IonicImageLoader} from 'ionic-image-loader';

@NgModule({
  declarations: [
    ItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPage),
    IonicImageLoader
  ],
})
export class ItemDetailsPageModule {}
