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
    ).map(result=>{
      return this.processArray(result);
    });
  }

  processArray(result: any){
    let tempArray = [];
    tempArray = tempArray.concat(result[0].results);
    tempArray = tempArray.concat(result[1].results);
    tempArray = tempArray.concat(result[2].results);

    //tempArray = this.filterByTime(tempArray);
    this.updatePathImg(tempArray);
    console.log(tempArray);
    return tempArray;
  }

  updatePathImg(array: any[]) {
    for (let item of array) {
      if (item.poster_path == null) {
        item.poster_path = 'assets/imgs/movieposter.jpg';
      } else {
        item.poster_path = 'http://image.tmdb.org/t/p/w154/'+item.poster_path;
      }
    }
  }

  filterByTime(array: any[]){
    let tempArray = array.filter(obj => obj.release_date > '1990' && obj.release_date < '1990-12-31');
    return tempArray;
  }
}
