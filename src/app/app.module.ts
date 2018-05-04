import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {MoviesPage} from '../pages/movies/movies';
import {TvShowsPage} from '../pages/tv-shows/tv-shows';
import {PeoplePage} from '../pages/people/people';
import {TabsPage} from '../pages/tabs/tabs';
import {HttpClientModule} from '@angular/common/http';
import { MoviesProvider } from '../providers/rest-tmdb/movies.provider';
import { PopCtrlProvider } from '../providers/shared-data/pop-ctrl.provider';
import {SearchPage} from '../pages/search/search';
import { SearchBarProvider } from '../providers/shared-data/search-bar.provider';
import { MultiSearchProvider } from '../providers/rest-tmdb/multi-search';
import {DatePicker} from '@ionic-native/date-picker';
import {CalendarPage} from '../pages/calendar/calendar';

@NgModule({
  declarations: [
    MyApp,
    MoviesPage,
    TvShowsPage,
    PeoplePage,
    TabsPage,
    SearchPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesPage,
    TvShowsPage,
    PeoplePage,
    TabsPage,
    SearchPage,
    CalendarPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesProvider,
    PopCtrlProvider,
    SearchBarProvider,
    MultiSearchProvider,
    DatePicker
  ]
})
export class AppModule {}
