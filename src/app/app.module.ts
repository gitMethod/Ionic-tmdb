import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {MoviesPage} from '../pages/movies/movies';
import {TvShowsPage} from '../pages/tv-shows/tv-shows';
import {PeoplePage} from '../pages/people/people';
import {TabsPage} from '../pages/tabs/tabs';
import {HttpClientModule} from '@angular/common/http';
import { MoviesProvider } from '../providers/api-tmdb/movies';
import {MoviesPopCtrlPage} from '../pages/pop-menu/pop-menu';
import { PopCtrlProvider } from '../providers/shared-data/pop-ctrl';

@NgModule({
  declarations: [
    MyApp,
    MoviesPage,
    TvShowsPage,
    PeoplePage,
    TabsPage,
    MoviesPopCtrlPage
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
    MoviesPopCtrlPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoviesProvider,
    PopCtrlProvider
  ]
})
export class AppModule {}
