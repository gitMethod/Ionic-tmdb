import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {MoviesPage} from '../pages/movies/movies';
import {TvShowsPage} from '../pages/tv-shows/tv-shows';
import {PeoplePage} from '../pages/people/people';
import {TabsPage} from '../pages/main-tabs/main-tabs';
import {HttpClientModule} from '@angular/common/http';
import { ListsRest } from '../providers/rest-tmdb/lists-rest';
import {SearchPage} from '../pages/search/search';
import { SearchBarProvider } from '../providers/shared-data/search-bar.provider';
import { MultiSearchProvider } from '../providers/rest-tmdb/search-rest';
import {DatePicker} from '@ionic-native/date-picker';
import {FilterModalPage} from '../pages/filterModal/filterModal';
import { MoviesData } from '../providers/shared-data/movies-data';
import { TvDataProvider } from '../providers/shared-data/tv-data';
import { PeopleDataProvider } from '../providers/shared-data/people-data';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {IonicImageLoader} from 'ionic-image-loader';
import { DetailsTmdbProvider } from '../providers/rest-tmdb/details-tmdb';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {SuperTabsModule} from 'ionic2-super-tabs';
import {VirtualScrollModule} from 'angular2-virtual-scroll';

@NgModule({
  declarations: [
    MyApp,
    MoviesPage,
    TvShowsPage,
    PeoplePage,
    TabsPage,
    SearchPage,
    FilterModalPage,
    ItemDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot(),
    NgCircleProgressModule.forRoot(),
    SuperTabsModule.forRoot(),
    VirtualScrollModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesPage,
    TvShowsPage,
    PeoplePage,
    TabsPage,
    SearchPage,
    FilterModalPage,
    ItemDetailsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ListsRest,
    SearchBarProvider,
    MultiSearchProvider,
    DatePicker,
    MoviesData,
    TvDataProvider,
    PeopleDataProvider,
    SplashScreen,
    DetailsTmdbProvider
  ]
})
export class AppModule {}
