import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppTab} from '../../models/app-tab';
import {AppList} from '../../models/app-list';
import {MoviesData} from './movies-data';

@Injectable()
export class ActiveData {

  activeTab: AppTab;
  activeList: AppList;

  constructor(public http: HttpClient, private moviesData: MoviesData) {
    this.activeList = moviesData.moviesObservable.getValue().listArray[0];
    this.activeTab = moviesData.moviesObservable.getValue();
  }

}
