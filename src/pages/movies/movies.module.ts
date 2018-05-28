import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPage } from './movies';
import {HttpClientModule} from '@angular/common/http';
import {IonicImageLoader} from 'ionic-image-loader';

@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    HttpClientModule,
    IonicImageLoader
  ],
})
export class MoviesPageModule {}
