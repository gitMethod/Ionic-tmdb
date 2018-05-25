import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {MoviesPage} from '../movies/movies';
import {PeoplePage} from '../people/people';
import {TvShowsPage} from '../tv-shows/tv-shows';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'main-tabs.html',
})
export class TabsPage{

  tab1Root = MoviesPage;
  tab2Root = TvShowsPage;
  tab3Root = PeoplePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events ) {

    this.events.publish('activeTab',0);
  }

  tabChanged(event) {
    this.events.publish('activeTab',event.index);
  }
}
