import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailsTmdbProvider} from '../../providers/rest-tmdb/details-tmdb';


@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  backdrop: any = '';
  poster: any = '';
  firstSubtitle: any = '';
  secondSubtitle: any = '';
  thirdSubtitle: any = '';
  rating: any = '';
  title: any = '';
  description: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private detailsTmdb: DetailsTmdbProvider) {

    this.poster = navParams.get('poster');
    this.chooseEndPoint(navParams.get('type'), navParams.get('id'));

  }


  chooseEndPoint(type, id){
    switch (type) {
      case 'MOVIES':
        this.loadMovie(id);
        break;
    }
  }

  loadMovie(id){
    let movie;
    this.detailsTmdb.getMovie(this.navParams.get('id')).subscribe( data => {
      movie = data;
      this.backdrop = movie.backdrop_path;
      this.rating = movie.vote_average;
      this.firstSubtitle = movie.release_date;
      this.secondSubtitle = movie.runtime;
      this.thirdSubtitle = movie.vote_count;
      this.title = movie.title;
      this.description = movie.overview;
    });
  }


  ionViewWillEnter() {
    document.querySelector("ion-navbar")['style'].display = 'none';
  }

  ionViewWillLeave() {
    document.querySelector("ion-navbar")['style'].display = 'flex';
  }



}
