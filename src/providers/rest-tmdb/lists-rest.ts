import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin';
import {AppList} from '../../models/app-list';
import 'rxjs/add/operator/delay';


@Injectable()
export class ListsRest {

  constructor(public http: HttpClient) {}

  getList(appList: AppList, tabName: string): Observable<any> {
    let dateSince = '';
    let dateUntil = '';
    if(tabName === 'MOVIES'){
      dateSince = '&primary_release_date.gte=';
      dateUntil = '&primary_release_date.lte='
    } else if (tabName === 'TV') {
      dateSince = '&first_air_date.gte=';
      dateUntil = '&first_air_date.lte='
    }
    return this.http.get(appList.apiUrl + dateSince + appList.minRange + dateUntil + appList.maxRange +'&page=' + appList.responsePage)
    .map(result=>{
      let tmpArray = this.concatArray(result);
      tmpArray = this.removeNullItems(tmpArray);
      tmpArray = this.updatePathImg(tmpArray);
      return tmpArray;
    });
  }

  concatArray(result: any){
    return  result.results;
  }

  updatePathImg(array: any[]) {
    for (let item of array) {
      if (item.poster_path === null || item.profile_path === null) {
        if (item.first_air_date){
          item.poster_path = 'assets/imgs/tvposter.jpg'
        } else if(item.release_date){
          item.poster_path = 'assets/imgs/movieposter.jpg';
        } else {
          item.profile_path = 'assets/imgs/peopleposter.jpg';
        }
      } else {
        if(item.poster_path){
          item.poster_path = 'http://image.tmdb.org/t/p/w154' + item.poster_path;
        } else {
          item.profile_path = 'http://image.tmdb.org/t/p/w154' + item.profile_path;
        }
      }
    }
    return array;
  }

  removeNullItems(array: any[]) {
    for (let i = array.length - 1; i >= 0; --i) {
      if (!array[i]) {
        array.splice(i, 1);
      }
    }
    return array;
  }


}
