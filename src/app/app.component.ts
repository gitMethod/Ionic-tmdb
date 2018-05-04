import {Component, ViewChild} from '@angular/core';
import {AlertController, ModalController, Nav, Platform, PopoverController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {SearchPage} from '../pages/search/search';
import {SearchBarProvider} from '../providers/shared-data/search-bar.provider';
import {CalendarPage} from '../pages/calendar/calendar';

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
              private searchDataProvider: SearchBarProvider,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController
              ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
    this.searchDataProvider.searchString.next(' ');
  }

  presentCalendarModal(){
    let modal = this.modalCtrl.create(CalendarPage,{},{showBackdrop:true, enableBackdropDismiss:true, cssClass: "my-modal"});
    modal.present();
  }

}

