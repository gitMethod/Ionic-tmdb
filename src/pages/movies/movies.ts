import { Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {MoviesProvider} from '../../providers/rest-tmdb/movies.provider';
import {List} from '../../models/list';
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
  moviesListShowed: List;
  moviesTab: Tab;
  infiniteScrollStatus = true;

  constructor(private moviesProvider: MoviesProvider, private listProvider: ListProvider) {

    let popularList: List = {name: 'Popular', responsePage: 1, apiUrl: AppSettings.MOVIES_POPULAR_ENDPOINT };
    let topRatedList: List = {name: 'Top rated', responsePage: 1, apiUrl: AppSettings.MOVIES_TOP_RATED_ENDPOINT};
    let upcomingList: List = {name: 'Up coming', responsePage: 1, apiUrl: AppSettings.MOVIES_UPCOMING_ENDPOINT};
    let nowPlaying: List = {name: 'Now Playing', responsePage: 1, apiUrl: AppSettings.MOVIES_NOW_PLAYING_ENDPOINT};

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
        } else {
          this.counter = 0;
          if (infiniteScroll) {
            infiniteScroll.complete()
          }
        }
      },
      err => {
        console.log( err );
      },
      ()=> {

      }
    )
  }

}
