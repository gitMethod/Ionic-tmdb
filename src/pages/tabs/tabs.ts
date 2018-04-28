import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tab, Tabs} from 'ionic-angular';
import {MoviesPage} from '../movies/movies';
import {PeoplePage} from '../people/people';
import {TvShowsPage} from '../tv-shows/tv-shows';
import {PopCtrlProvider} from '../../providers/shared-data/pop-ctrl';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage{

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = MoviesPage;
  tab2Root = TvShowsPage;
  tab3Root = PeoplePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private popCtrl: PopCtrlProvider) {}

  tabSelected(tab: Tab) {
    this.popCtrl.activeTab = tab.tabTitle;
    console.log(tab.tabTitle);
  }
}
