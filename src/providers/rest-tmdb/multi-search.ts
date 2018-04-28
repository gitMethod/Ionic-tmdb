import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MultiSearchProvider {

  apiKey = 'dbb539c09bc6d9e2e9e6bf360b705e5b';
  searchValue: any;

  constructor(public http: HttpClient) {}

  getSearchResults(strSearch: string): Observable<any> {
    return this.http.get(
      'https://api.themoviedb.org/3/search/multi?api_key='+this.apiKey+'&language=en-US&query='+strSearch+'&page=1&include_adult=false'
    );
  }

}
