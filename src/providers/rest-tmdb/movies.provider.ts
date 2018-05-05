import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin';
import {List} from '../../models/list';

@Injectable()
export class MoviesProvider {

  constructor(public http: HttpClient) {}

  getList(list: List): Observable<any> {
    return Observable.forkJoin(
      this.http.get(list.apiUrl + list.responsePage),
      this.http.get(list.apiUrl + (list.responsePage + 1)),
      this.http.get(list.apiUrl + (list.responsePage + 2))
    ).map(result=>{ return this.processArray(result)});
  }

  processArray(result: any){
    let tempArray = [];
    tempArray = tempArray.concat(result[0].results);
    tempArray = tempArray.concat(result[1].results);
    tempArray = tempArray.concat(result[2].results);
    return tempArray;
  }
}
