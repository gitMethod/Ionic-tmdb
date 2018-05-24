import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailsTmdbProvider} from '../../providers/rest-tmdb/details-tmdb';
import {CircleProgressOptions} from 'ng-circle-progress';


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
  circleTitle: any = '';
  circleUnits: any = '';


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private detailsTmdb: DetailsTmdbProvider, private circleOptions: CircleProgressOptions) {

    this.poster = navParams.get('poster');
    this.chooseEndPoint(navParams.get('type'), navParams.get('id'));

  }


  chooseEndPoint(type, id){
    switch (type) {
      case 'MOVIES':
        this.loadMovie(id);
        break;
      case 'TV':
        this.loadTv(id);
        break;
      case 'PEOPLE':
        this. loadPeople(id);
        break;
    }
  }

  loadMovie(id){
    let movie;
    this.detailsTmdb.getMovie(id).subscribe( data => {
      movie = data;
      this.circleUnits = '%';
      this.circleTitle = movie.vote_average;
      this.backdrop =  movie.backdrop_path ? ('http://image.tmdb.org/t/p/w300' + movie.backdrop_path) : 'assets/imgs/backdrop_movie.jpg';
      this.rating = movie.vote_average;
      this.firstSubtitle = movie.release_date.substr(0,4);
      this.secondSubtitle = movie.runtime + ' minutes';
      this.thirdSubtitle = movie.vote_count + ' votes';
      this.title = movie.title;
      this.description = movie.overview;
    });
  }

  loadTv(id){
    let tv;
    this.detailsTmdb.getTv(id).subscribe( data => {
      tv = data;
      this.circleUnits = '%';
      this.circleTitle = tv.vote_average;
      this.backdrop =  tv.backdrop_path ? ('http://image.tmdb.org/t/p/w300' + tv.backdrop_path) : 'assets/imgs/backdrop_tv.jpg';
      this.rating = tv.vote_average;
      this.firstSubtitle = tv.first_air_date.substr(0,4);
      this.secondSubtitle = tv.episode_run_time + ' minutes';
      this.thirdSubtitle = tv.vote_count + ' votes';
      this.title = tv.name;
      this.description = tv.overview;
    });
  }

  loadPeople(id){
    let people;
    this.detailsTmdb.getPersonImages(id).subscribe( data=>{
      this.backdrop =  data[0];
    });
    this.detailsTmdb.getPerson(id).subscribe( data => {
      console.log(data);
      people = data;
      this.circleUnits = '#';
      this.circleTitle = this.navParams.get('ranking') + 1;
      this.rating = 10;
      this.firstSubtitle = people.birthday;
      this.secondSubtitle = people.place_of_birth;
      this.title = people.name;
      this.description = people.biography;
    });
  }


  ionViewWillEnter() {
    document.querySelector("ion-navbar")['style'].display = 'none';
  }

  ionViewWillLeave() {
    document.querySelector("ion-navbar")['style'].display = 'flex';
  }



}
