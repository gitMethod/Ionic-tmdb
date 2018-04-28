import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PopCtrlProvider {

  activeTab: any;
  tabOptions: any[];
  clickedOption = new BehaviorSubject('testing');

  constructor(public http: HttpClient) {}

}
