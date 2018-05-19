import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieTabsPage } from './movie-tabs';

@NgModule({
  declarations: [
    MovieTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieTabsPage),
  ],
})
export class MovieTabsPageModule {}
