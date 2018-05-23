import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailsTmdbProvider} from '../../providers/rest-tmdb/details-tmdb';


@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  poster: any = '';
  movie: any = '';
  details: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private detailsTmdb: DetailsTmdbProvider) {
    let obj = navParams.get('movie');
    this.poster = obj.poster_path;

    detailsTmdb.getMovie(obj.id).subscribe( data => {
      this.movie = data;
      console.log(this.movie);
    });
  }







  ionViewWillEnter() {
    document.querySelector("ion-navbar")['style'].display = 'none';
  }

  ionViewWillLeave() {
    document.querySelector("ion-navbar")['style'].display = 'flex';
  }



}
