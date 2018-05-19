import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppSettings} from '../../models/app-settings';
import {AppList} from '../../models/app-list';


@Injectable()
export class PeopleDataProvider {

  tabsObs: BehaviorSubject<AppTab>;
  listObs: BehaviorSubject<AppList>;

  constructor(public http: HttpClient) {

    const peoplePopular = new AppList('Popular', AppSettings.PEOPLE_POPULAR);

    const peopleTab = {
      name: 'PEOPLE',
      listArray: [peoplePopular],
    };

    this.tabsObs = new BehaviorSubject<AppTab>(peopleTab);
    this.listObs = new BehaviorSubject<AppList>(peopleTab.listArray[0]);
  }


}
