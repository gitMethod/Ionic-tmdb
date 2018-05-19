import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../models/app-settings';
import {AppList} from '../../models/app-list';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MoviesData {

  tabsObs: BehaviorSubject<AppTab>;
  listObs: BehaviorSubject<AppList>;

  constructor(public http: HttpClient) {

    const moviesPopular = new AppList('Popular', AppSettings.MOVIES_POPULAR_ENDPOINT);
    const moviesTopRated = new AppList('Top rated', AppSettings.MOVIES_TOP_RATED_ENDPOINT);
    const moviesUpcoming = new AppList('Up coming', AppSettings.MOVIES_UPCOMING_ENDPOINT);
    const moviesNowPlaying = new AppList('Now playing', AppSettings.MOVIES_NOW_PLAYING_ENDPOINT);

    const moviesTab = {
      name: 'MOVIES',
      listArray: [moviesPopular, moviesTopRated, moviesUpcoming, moviesNowPlaying],
    };

    this.tabsObs = new BehaviorSubject<AppTab>(moviesTab);
    this.listObs = new BehaviorSubject<AppList>(moviesTab.listArray[0]);

  }


}
