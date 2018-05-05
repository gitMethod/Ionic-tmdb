import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {MoviesPage} from '../movies/movies';
import {PeoplePage} from '../people/people';
import {TvShowsPage} from '../tv-shows/tv-shows';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}
