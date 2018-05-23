import {Component, ViewChild} from '@angular/core';
import {Events, ModalController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/main-tabs/main-tabs';
import {SearchPage} from '../pages/search/search';
import {SearchBarProvider} from '../providers/shared-data/search-bar.provider';
import {FilterModalPage} from '../pages/filterModal/filterModal';
import {ImageLoaderConfig} from 'ionic-image-loader';
import {timer} from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  activeTab: string;
  rootPage:any = TabsPage;
  isSearchBarOpened = false;
  @ViewChild(Nav) nav: Nav;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private searchDataProvider: SearchBarProvider, private modalCtrl: ModalController,
              private events: Events, private imageLoaderConfig: ImageLoaderConfig
  ){
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(()=> this.showSplash = false);
    });
    events.subscribe('activeTab',(data) => { this.activeTab = data });
    this.imageLoaderConfig.setMaximumCacheAge(168 * 60 * 60 * 1000);
    this.imageLoaderConfig.enableSpinner(true);
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

  presentFilterModal(){
    let modal = this.modalCtrl.create(
      FilterModalPage,
      {'activeTab': this.activeTab},
      {showBackdrop:true, enableBackdropDismiss:true, cssClass: "my-modal"});
    modal.present();
  }

}

