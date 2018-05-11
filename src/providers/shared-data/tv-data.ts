import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../models/app-settings';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppList} from '../../models/app-list';

@Injectable()
export class TvDataProvider {

  tvTab: AppTab;
  tvObservable: BehaviorSubject<AppTab>;

  tvPopular: AppList;
  tvTopRated: AppList;
  tvAiringToday: AppList;
  tvOnTheAir: AppList;

  constructor(public http: HttpClient) {

    this.tvPopular = new AppList('Popular', AppSettings.TV_POPULAR);
    this.tvTopRated = new AppList('Top rated', AppSettings.TV_TOP_RATED);
    this.tvAiringToday = new AppList('Airing today', AppSettings.TV_AIRING_TODAY);
    this.tvOnTheAir = new AppList('On the air', AppSettings.TV_ON_THE_AIR);

    this.tvTab = {
      name: 'TV',
      listArray: [this.tvPopular, this.tvTopRated, this.tvAiringToday, this.tvOnTheAir],
    };

    this.tvObservable = new BehaviorSubject<AppTab>(this.tvTab);
  }

}
