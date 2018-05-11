import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../models/app-settings';
import {AppList} from '../../models/app-list';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MoviesData {

  moviesTab: AppTab;
  moviesObservable: BehaviorSubject<AppTab>;

  moviesPopular: AppList;
  moviesTopRated: AppList;
  moviesUpcoming: AppList;
  moviesNowPlaying: AppList;

  constructor(public http: HttpClient) {

    this.moviesPopular = new AppList('Popular', AppSettings.MOVIES_POPULAR_ENDPOINT);
    this.moviesTopRated = new AppList('Top rated', AppSettings.MOVIES_TOP_RATED_ENDPOINT);
    this.moviesUpcoming = new AppList('Up coming', AppSettings.MOVIES_UPCOMING_ENDPOINT);
    this.moviesNowPlaying = new AppList('Now Playing', AppSettings.MOVIES_NOW_PLAYING_ENDPOINT);

    this.moviesTab = {
      name: 'MOVIES',
      listArray: [this.moviesPopular, this.moviesTopRated, this.moviesUpcoming, this.moviesNowPlaying],
      listShowedIdx: 0
    };

    this.moviesObservable = new BehaviorSubject<AppTab>(this.moviesTab);
  }


}
