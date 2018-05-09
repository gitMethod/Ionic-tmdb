import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin';
import {MovieList} from '../../models/movie-list';
import 'rxjs/add/operator/delay';
import {observable} from 'rxjs/symbol/observable';
import {List} from 'ionic-angular';

@Injectable()
export class MoviesProvider {

  constructor(public http: HttpClient) {}

  getList(movieList: MovieList): Observable<any> {
    return Observable.forkJoin(
      this.http.get(movieList.apiUrl + movieList.responsePage),
      this.http.get(movieList.apiUrl + (movieList.responsePage + 1)),
      this.http.get(movieList.apiUrl + (movieList.responsePage + 2))

    ).map(result=>{
      let tmpArray = this.concatArray(result);
      tmpArray = this.updatePathImg(tmpArray);
      tmpArray = this.filterByTime(tmpArray, movieList);
      console.log(tmpArray);

      return tmpArray;
    }).delay(100);
  }

  concatArray(result: any){
    let tempArray = [];
    tempArray = tempArray.concat(result[0].results);
    tempArray = tempArray.concat(result[1].results);
    tempArray = tempArray.concat(result[2].results);
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
    return array;
  }

  filterByTime(array: any[], movieList: MovieList){
    return  array.filter(obj =>
      obj.release_date > movieList.minRange.toString() && obj.release_date < movieList.maxRange.toString()+'1231');
  }

}
