import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin';
import {AppList} from '../../models/app-list';
import 'rxjs/add/operator/delay';
import {ImageLoader} from 'ionic-image-loader';
import {isNullOrUndefined} from 'util';


@Injectable()
export class ListsRest {

  constructor(public http: HttpClient, public imageLoader: ImageLoader) {}

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
      let tmpArray = this.removeNullItems(result);
      this.preloadImg(tmpArray);
      tmpArray = this.updatePathImg(tmpArray);
      console.log(tmpArray);
      return tmpArray;
    });
  }

  removeNullItems(object) {
    let array = object.results;
    array.filter(item=>{
      return item != null || item != undefined
    });
    return array;
  }

  updatePathImg(array) {
    array.forEach(item=>{
      if(item.poster_path){
        item.poster_path = 'http://image.tmdb.org/t/p/w154' + item.poster_path;
      } else {
        item.profile_path = 'http://image.tmdb.org/t/p/w154' + item.profile_path;
      }
    });
    return array;
  }

  preloadImg(array){
    array.forEach(item=>{
      this.imageLoader.preload('http://image.tmdb.org/t/p/w154' + item.profile_path)
    })
  }





}
