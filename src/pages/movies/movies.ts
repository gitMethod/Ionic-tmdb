import { Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {MoviesProvider} from '../../providers/rest-tmdb/movies.provider';
import {MovieList} from '../../models/movie-list';
import {AppSettings} from '../../models/app-settings';
import {ListProvider} from '../../providers/shared-data/list.provider';
import {Tab} from '../../models/tab';

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  movies = [];
  moviesListShowed: MovieList;
  moviesTab: Tab;
  infiniteScrollStatus = true;

  constructor(private moviesProvider: MoviesProvider, private listProvider: ListProvider) {

    let popularList: MovieList = {
      name: 'Popular', responsePage: 1, apiUrl: AppSettings.MOVIES_POPULAR_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900 };
    let topRatedList: MovieList = {
      name: 'Top rated', responsePage: 1, apiUrl: AppSettings.MOVIES_TOP_RATED_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900};
    let upcomingList: MovieList = {
      name: 'Up coming', responsePage: 1, apiUrl: AppSettings.MOVIES_UPCOMING_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900};
    let nowPlaying: MovieList = {
      name: 'Now Playing', responsePage: 1, apiUrl: AppSettings.MOVIES_NOW_PLAYING_ENDPOINT,
      maxRange:(new Date()).getFullYear(), minRange: 1900};

    this.moviesTab = {
      name: 'MOVIES',
      listArray: [popularList, topRatedList, upcomingList, nowPlaying],
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
    this.moviesProvider.getList(this.moviesListShowed).subscribe(
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
