import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPage } from './movies';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MoviesPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPage),
    HttpClientModule,
  ],
})
export class MoviesPageModule {}
