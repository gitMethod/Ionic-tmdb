import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AppList} from '../../models/app-list';

@Injectable()
export class ActiveData {

  activeTab: AppTab;
  activeList: AppList;

  constructor(public http: HttpClient) {}

}
