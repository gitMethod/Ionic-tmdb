import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeoplePage } from './people';
import {IonicImageLoader} from 'ionic-image-loader';

@NgModule({
  declarations: [
    PeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(PeoplePage),
    IonicImageLoader
  ],
})
export class PeoplePageModule {}
