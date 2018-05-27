import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class MultiSearchProvider {

  searchValue: any;

  constructor(public http: HttpClient) {}

  getSearchResults(strSearch: string): Observable<any> {
    return Observable.forkJoin(
      this.http.get('https://api.themoviedb.org/3/search/multi'+AppSettings.API_KEY+'&language=en-US&query='+strSearch+'&page=1&include_adult=false'),
      this.http.get('https://api.themoviedb.org/3/search/multi'+AppSettings.API_KEY+'&language=en-US&query='+strSearch+'&page=2&include_adult=false'),
      this.http.get('https://api.themoviedb.org/3/search/multi'+AppSettings.API_KEY+'&language=en-US&query='+strSearch+'&page=3&include_adult=false')
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
