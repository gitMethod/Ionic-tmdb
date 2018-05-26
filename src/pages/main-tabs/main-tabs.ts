import {Component, ViewChild} from '@angular/core';
import { IonicPage, ModalController, Nav, NavController, NavParams, Tabs} from 'ionic-angular';
import {MoviesPage} from '../movies/movies';
import {PeoplePage} from '../people/people';
import {TvShowsPage} from '../tv-shows/tv-shows';
import {ImageLoaderConfig} from 'ionic-image-loader';
import {SearchBarProvider} from '../../providers/shared-data/search-bar.provider';
import {SearchPage} from '../search/search';
import {FilterModalPage} from '../filterModal/filterModal';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'main-tabs.html',
})
export class TabsPage{

  tab1Root = MoviesPage;
  tab2Root = TvShowsPage;
  tab3Root = PeoplePage;

  activeTab: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private imageLoaderConfig: ImageLoaderConfig ) {
    this.imageLoaderConfig.setMaximumCacheAge(168 * 60 * 60 * 1000);
    this.imageLoaderConfig.enableSpinner(true);
  }

  tabChanged(event) {
    this.activeTab = event.index;
  }

  openSearchPage(){
    this.navCtrl.push(SearchPage);
  }


  presentFilterModal(){
    let modal = this.modalCtrl.create(
      FilterModalPage,
      {'activeTab': this.activeTab},
      {showBackdrop:true, enableBackdropDismiss:true, cssClass: "my-modal"});
    modal.present();
  }
}
