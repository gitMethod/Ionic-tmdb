import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchBarProvider {

  searchString = new BehaviorSubject('');

  constructor(public http: HttpClient) {}

}
