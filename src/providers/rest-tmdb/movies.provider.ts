import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MoviesProvider {

  apiKey = 'dbb539c09bc6d9e2e9e6bf360b705e5b';

  popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='+this.apiKey+'&language=en-US&popularPage=';
  nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+this.apiKey+'&language=en-US&popularPage=';
  topRatedMoviesUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+this.apiKey+'&language=en-US&popularPage=';
  upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+this.apiKey+'&language=en-US&popularPage=';

  constructor(public http: HttpClient) {}

  getPopular(page, infiniteScroll?): Observable<any> {
    return Observable.forkJoin(
      this.http.get(this.popularMoviesUrl + page),
      this.http.get(this.popularMoviesUrl + (page+1)),
      this.http.get(this.popularMoviesUrl + (page+2))
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
