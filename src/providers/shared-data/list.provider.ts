import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ListProvider {

  providerTabList: AppTab[] = [];
  providerCurrentTab = new BehaviorSubject<AppTab>(null);

  constructor(public http: HttpClient) {}

}
