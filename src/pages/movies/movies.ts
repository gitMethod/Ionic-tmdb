import { Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {MoviesProvider} from '../../providers/rest-tmdb/movies.provider';
import {AppList} from '../../models/app-list';
import {AppSettings} from '../../models/app-settings';
import {ListProvider} from '../../providers/shared-data/list.provider';
import {AppTab} from '../../models/app-tab';

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  movies = [];
  moviesListShowed: AppList;
  moviesTab: AppTab;
  infiniteScrollStatus = true;

  constructor(private moviesProvider: MoviesProvider, private listProvider: ListProvider) {

    let moviesPopular: AppList = {
      name: 'Popular', responsePage: 1, apiUrl: AppSettings.MOVIES_POPULAR_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900 };
    let moviesTopRated: AppList = {
      name: 'Top rated', responsePage: 1, apiUrl: AppSettings.MOVIES_TOP_RATED_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900};
    let moviesUpcoming: AppList = {
      name: 'Up coming', responsePage: 1, apiUrl: AppSettings.MOVIES_UPCOMING_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900};
    let moviesNowPlaying: AppList = {
      name: 'Now Playing', responsePage: 1, apiUrl: AppSettings.MOVIES_NOW_PLAYING_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900};

    this.moviesTab = {
      name: 'MOVIES',
      listArray: [moviesPopular, moviesTopRated, moviesUpcoming, moviesNowPlaying],
      listShowedIdx: 0
    };

    this.listProvider.providerCurrentTab.next(this.moviesTab);

    this.listProvider.providerCurrentTab.subscribe((value) =>{
      this.moviesTab = value;
      this.moviesListShowed = value.listArray[value.listShowedIdx];
      this.movies = [];
      this.loadList();
    });
  }

  counter: number = 0;

  loadList(infiniteScroll?) {
    this.moviesProvider.getList(this.moviesListShowed, this.moviesTab.name).subscribe(
      data => {
        this.moviesListShowed.responsePage += 3;
        this.counter += data.length;
        this.movies = this.movies.concat(data);

        if(this.counter < 9)
        {
          this.loadList(infiniteScroll);
        } else if(this.moviesListShowed.responsePage >= 1000) {
          this.infiniteScrollStatus = false;
          console.log(this.infiniteScrollStatus);
        } else {
          this.counter = 0;
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        }
      },
      err => {
        console.log( err );
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      },
    )
  }

}
