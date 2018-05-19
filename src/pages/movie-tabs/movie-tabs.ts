import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {PeoplePage} from '../people/people';
import {MoviesPage} from '../movies/movies';
import {TvShowsPage} from '../tv-shows/tv-shows';

@IonicPage()
@Component({
  selector: 'page-movie-tabs',
  templateUrl: 'movie-tabs.html',
})
export class MovieTabsPage {

  tab1Root = MoviesPage;
  tab2Root = TvShowsPage;
  tab3Root = PeoplePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
