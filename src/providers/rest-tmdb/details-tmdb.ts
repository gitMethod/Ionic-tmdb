import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../models/app-settings';
import {App} from 'ionic-angular';


@Injectable()
export class DetailsTmdbProvider {

  constructor(public http: HttpClient) {

  }

  getMovie(id){
    return this.http.get(AppSettings.API_BASE + 'movie/' + id + AppSettings.API_KEY);
  }

  getMovieCredits(id){
    return this.http.get(AppSettings.API_BASE + 'movie/' + id + '/credits' + AppSettings.API_KEY);
  }

  getPerson(id){
    return this.http.get(AppSettings.API_BASE + 'person/' + id + AppSettings.API_KEY);
  }

  getPersonImages(id){
    return this.http.get(AppSettings.API_BASE + 'person/' + id +'/tagged_images'+ AppSettings.API_KEY);
  }

  getTv(id){
    return this.http.get(AppSettings.API_BASE + 'tv/' + id + AppSettings.API_KEY);
  }

  getTvCredits(id){
    return this.http.get(AppSettings.API_BASE + 'tv/' + id + '/credits' + AppSettings.API_KEY);
  }



}
