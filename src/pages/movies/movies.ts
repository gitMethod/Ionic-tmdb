import { Component, NgZone} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {MoviesProvider} from '../../providers/rest-tmdb/movies.provider';
import {PopCtrlProvider} from '../../providers/shared-data/pop-ctrl.provider';
@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  movies = [];
  moviesOptions = ['Popular','Now playing','Top rated','upcoming'];
  moviesCheckOption = '';

  popularPage = 1;
  nowPlayingPage = 1;
  topRatedPage = 1;
  upcomingPage = 1;
  currentPage = 0;
  maximumPages = 1000;



  constructor(private moviesProvider: MoviesProvider, private popCrlProvider: PopCtrlProvider, public zone: NgZone) {
    this.popCrlProvider.checkedOption.next(this.moviesOptions[0]);
    this.popCrlProvider.checkedOption.subscribe((value) =>{
      this.moviesCheckOption = value;
      this.chooseCurrentPage(value);
      this.chooseCurrentList(value);
    });
  }

  chooseCurrentPage(str){
    switch(str) {
      case this.moviesOptions[0]:
        return this.popularPage;
      case this.moviesOptions[1]:
        return this.nowPlayingPage;
      case this.moviesOptions[2]:
        return this.topRatedPage;
      case this.moviesOptions[3]:
        return this.upcomingPage;
      default:
        console.log("none possible option");
    }
  }

  chooseCurrentList(str, infiniteScroll?){
    switch(str) {
      case this.moviesOptions[0]:
        this.loadPopular(infiniteScroll);
        break;
      case this.moviesOptions[1]:
        this.loadNowPlaying();
        break;
      case this.moviesOptions[2]:
        this.loadTopRated();
        break;
      case this.moviesOptions[3]:
        this.loadUpcoming();
        break;
      default:
        console.log("none possible option");
    }
  }

  ionViewWillEnter() {
    this.popCrlProvider.tabOptions = this.moviesOptions;
  }

  loadPopular(infiniteScroll) {
    this.moviesProvider.getPopular(this.popularPage, infiniteScroll).subscribe(
      data => {
        this.movies = this.movies.concat(data[0].results);
        this.movies = this.movies.concat(data[1].results);
        this.movies = this.movies.concat(data[2].results);
        if(infiniteScroll){
          infiniteScroll.complete();
        }
      },
      err => {console.log(err)},
    );
  }

  loadMore(infiniteScroll){
    this.chooseCurrentList(this.moviesCheckOption, infiniteScroll);

    if(this.popularPage === this.maximumPages){
      infiniteScroll.enable(false);
    }
  }

  loadNowPlaying() {
    this.moviesProvider.getNowPlaying().subscribe(
      data => {
        const array0 = data[0].results;
        const array1 = data[1].results;
        const array2 = data[2].results;
        this.movies = array0.concat(array1).concat(array2);
      },
      err => {console.log(err)}
    )
  }

  loadTopRated() {
    this.moviesProvider.getTopRated().subscribe(
      data => {
        const array0 = data[0].results;
        const array1 = data[1].results;
        const array2 = data[2].results;
        this.movies = array0.concat(array1).concat(array2);

      },
      err => {console.log(err)}
    )
  }

  loadUpcoming() {
    this.moviesProvider.getUpcoming().subscribe(
      data => {
        const array0 = data[0].results;
        const array1 = data[1].results;
        const array2 = data[2].results;
        this.movies = array0.concat(array1).concat(array2);

      },
      err => {console.log(err)}
    )
  }


}
