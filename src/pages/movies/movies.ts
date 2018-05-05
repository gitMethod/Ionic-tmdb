import { Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {MoviesProvider} from '../../providers/rest-tmdb/movies.provider';
import {List} from '../../models/list';
import {AppSettings} from '../../models/app-settings';
import {ListProvider} from '../../providers/shared-data/list.provider';
import {Tab} from '../../models/tab';
import {convertDeepLinkEntryToJsObjectString} from '@ionic/app-scripts/dist/deep-linking/util';
@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  movies = [];
  maximumPages = 1000;

  moviesCurrentList: List;
  moviesCurrentTab: Tab;


  constructor(private moviesProvider: MoviesProvider, private listProvider: ListProvider) {

    let popularList: List = {name: 'Popular', responsePage: 1, apiUrl: AppSettings.MOVIES_POPULAR_ENDPOINT };
    let topRatedList: List = {name: 'Top rated', responsePage: 1, apiUrl: AppSettings.MOVIES_TOP_RATED_ENDPOINT};
    let upcomingList: List = {name: 'Up coming', responsePage: 1, apiUrl: AppSettings.MOVIES_UPCOMING_ENDPOINT};
    let nowPlaying: List = {name: 'Now Playing', responsePage: 1, apiUrl: AppSettings.MOVIES_NOW_PLAYING_ENDPOINT};

    this.moviesCurrentTab = {
      name: 'MOVIES',
      listArray: [popularList, topRatedList, upcomingList, nowPlaying],
      optionSelected: 0
    };

    this.listProvider.providerCurrentTab.next(this.moviesCurrentTab);

    this.listProvider.providerCurrentTab.subscribe((value) =>{
      this.moviesCurrentTab = value;
      this.moviesCurrentList = value.listArray[value.optionSelected];
      this.movies = [];
      this.loadList(this.moviesCurrentList);
    });
  }

  loadList(list: List, infiniteScroll?) {
    this.moviesProvider.getList(list).subscribe(
      data => {
        this.movies = data;

        if(infiniteScroll){
          infiniteScroll.complete();
        }
      },
      err => {console.log(err)},
    );
  }

  loadMore(infiniteScroll){
    this.moviesCurrentList.responsePage += 3;
    this.loadList(this.moviesCurrentList, infiniteScroll);

    if(this.moviesCurrentList.responsePage >= this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

}
