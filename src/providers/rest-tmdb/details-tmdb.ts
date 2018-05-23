import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../models/app-settings';
import {App} from 'ionic-angular';


@Injectable()
export class DetailsTmdbProvider {

  constructor(public http: HttpClient) {

  }

  getMovie(id){
    return this.http.get(AppSettings.API_BASE + 'movie/' + id + AppSettings.API_KEY + AppSettings.LANGUAGE);
  }

  getMovieCredits(id){
    return this.http.get(AppSettings.API_BASE + 'movie/' + id + '/credits' + AppSettings.API_KEY + AppSettings.LANGUAGE);
  }

  getPerson(id){
    return this.http.get(AppSettings.API_BASE + 'person/' + id + AppSettings.API_KEY + AppSettings.LANGUAGE);
  }

  getTv(id){
    return this.http.get(AppSettings.API_BASE + 'tv/' + id + AppSettings.API_KEY + AppSettings.LANGUAGE);
  }

  getTvCredits(id){
    return this.http.get(AppSettings.API_BASE + 'tv/' + id + '/credits' + AppSettings.API_KEY + AppSettings.LANGUAGE);
  }



}
