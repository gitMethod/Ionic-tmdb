import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppSettings} from '../../models/app-settings';
import {AppList} from '../../models/app-list';


@Injectable()
export class PeopleDataProvider {

  peopleTab: AppTab;
  peopleObservable: BehaviorSubject<AppTab>;

  peoplePopular: AppList;

  constructor(public http: HttpClient) {

    this.peoplePopular = new AppList('Popular', AppSettings.PEOPLE_POPULAR);

    this.peopleTab = {
      name: 'PEOPLE',
      listArray: [this.peoplePopular],
    };

    this.peopleObservable = new BehaviorSubject<AppTab>(this.peopleTab);
  }


}
