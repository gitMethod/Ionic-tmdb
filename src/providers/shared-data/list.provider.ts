import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Tab} from '../../models/tab';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ListProvider {

  providerCurrentTab = new BehaviorSubject<Tab>(null);

  constructor(public http: HttpClient) {}

}
