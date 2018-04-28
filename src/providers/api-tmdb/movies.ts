import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MoviesProvider {

  constructor(public http: HttpClient) {}

  apiKey = 'dbb539c09bc6d9e2e9e6bf360b705e5b';

  popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='+this.apiKey+'&language=en-US&page=';
  nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+this.apiKey+'&language=en-US&page=';
  topRatedMoviesUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+this.apiKey+'&language=en-US&page=';
  upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+this.apiKey+'&language=en-US&page=';

  getPopular(): Observable<any> {
    return Observable.forkJoin(
      this.http.get(this.popularMoviesUrl + 1),
      this.http.get(this.popularMoviesUrl + 2),
      this.http.get(this.popularMoviesUrl + 3)
    );
  }

  getNowPlaying(): Observable<any> {
    return Observable.forkJoin(
      this.http.get(this.nowPlayingMoviesUrl + 1),
      this.http.get(this.nowPlayingMoviesUrl + 2),
      this.http.get(this.nowPlayingMoviesUrl + 3)
    );
  }

  getTopRated(): Observable<any> {
    return Observable.forkJoin(
      this.http.get(this.topRatedMoviesUrl + 1),
      this.http.get(this.topRatedMoviesUrl + 2),
      this.http.get(this.topRatedMoviesUrl + 3)
    );
  }

  getUpcoming(): Observable<any> {
    return Observable.forkJoin(
      this.http.get(this.upcomingMoviesUrl + 1),
      this.http.get(this.upcomingMoviesUrl + 2),
      this.http.get(this.upcomingMoviesUrl + 3)
    );
  }


}
