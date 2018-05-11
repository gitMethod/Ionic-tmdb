import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppTab} from '../../models/app-tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveTab {

  activeTab: AppTab;

  constructor(public http: HttpClient) {}

}
