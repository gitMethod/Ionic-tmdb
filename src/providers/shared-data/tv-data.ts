import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../models/app-settings';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppList} from '../../models/app-list';

@Injectable()
export class TvDataProvider {

  tabsObs: BehaviorSubject<AppTab>;
  listObs: BehaviorSubject<AppList>;

  constructor(public http: HttpClient) {

    const tvPopular = new AppList('Popular', AppSettings.TV_POPULAR);
    const tvTopRated = new AppList('Top rated', AppSettings.TV_TOP_RATED);
    const tvAiringToday = new AppList('Airing today', AppSettings.TV_AIRING_TODAY);
    const tvOnTheAir = new AppList('On the air', AppSettings.TV_ON_THE_AIR);

    const tvTab = {
      name: 'TV',
      listArray: [tvPopular, tvTopRated, tvAiringToday, tvOnTheAir],
    };

    this.tabsObs = new BehaviorSubject<AppTab>(tvTab);
    this.listObs = new BehaviorSubject<AppList>(tvTab.listArray[0]);
  }

}
