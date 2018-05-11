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
      this.http.get('https://api.themoviedb.org/3/search/multi?api_key='+AppSettings.API_KEY+'&language=en-US&query='+strSearch+'&popularPage=1&include_adult=false'),
      this.http.get('https://api.themoviedb.org/3/search/multi?api_key='+AppSettings.API_KEY+'&language=en-US&query='+strSearch+'&popularPage=2&include_adult=false'),
      this.http.get('https://api.themoviedb.org/3/search/multi?api_key='+AppSettings.API_KEY+'&language=en-US&query='+strSearch+'&popularPage=3&include_adult=false')
    ).map(result=>{ return this.processArray(result)});
  }

  processArray(result: any){
    let tempArray = [];
    tempArray = tempArray.concat(result[0].results);
    tempArray = tempArray.concat(result[1].results);
    tempArray = tempArray.concat(result[2].results);
    this.updatePathImg(tempArray);
    return tempArray;
  }

  updatePathImg(array: any[]) {
    for (let item of array) {
      if (item.poster_path == null) {
        switch (item.media_type) {
          case ('tvs'):
            item.poster_path = 'assets/imgs/tvposter.jpg';
            break;
          case ('person'):
            item.poster_path = 'assets/imgs/peopleposter.jpg';
            break;
          case ('movie'):
            item.poster_path = 'assets/imgs/movieposter.jpg';
            break;
        }
      } else {
        item.poster_path = 'http://image.tmdb.org/t/p/w185/'+item.poster_path;
      }
    }
  }

}
