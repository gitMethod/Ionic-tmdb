import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, PopoverController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {MoviesPopCtrlPage} from '../pages/pop-menu/pop-menu';
import {SearchPage} from '../pages/search/search';
import {SearchBarProvider} from '../providers/shared-data/search-bar.provider';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  isSearchBarOpened = false;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private popOverCtrl: PopoverController,
              private searchDataProvider: SearchBarProvider
              ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  presentPopover(myEvent) {
    let popover = this.popOverCtrl.create(MoviesPopCtrlPage);
    popover.present({ev:myEvent});
  }

  openSearchPage(){
    this.nav.push(SearchPage);
  }

  searchClosed(){
    this.nav.pop();
  }

  searchValue(event: any){
    this.searchDataProvider.searchString.next(event.target.value);
  }

  emptyValue(){
    this.searchDataProvider.searchString.next('');
  }





}

