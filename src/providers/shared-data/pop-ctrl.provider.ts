import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PopCtrlProvider {

  activeTab: any;
  tabOptions: any[] = [];
  checkedOption = new BehaviorSubject('');

  constructor(public http: HttpClient) {}

}
