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


  getTv(id){
    return this.http.get(AppSettings.API_BASE + 'tv/' + id + AppSettings.API_KEY);
  }

  getPerson(id){
    return this.http.get(AppSettings.API_BASE + 'person/' + id + AppSettings.API_KEY);
  }

  getPersonImages(id){
    return this.http.get(AppSettings.API_BASE + 'person/' + id +'/tagged_images'+ AppSettings.API_KEY).
    map( data=>{
      return this.findPersonBackdrop(data)
    });
  }

  findPersonBackdrop(array){
    console.log(array);
      return array.results
        .filter(image => image.aspect_ratio === 1.7777777777778)
        .map(backdrop => backdrop.file_path);
  }


}
