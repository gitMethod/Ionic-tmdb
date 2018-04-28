import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {MoviesProvider} from '../../providers/api-tmdb/movies';
import {PopCtrlProvider} from '../../providers/shared-data/pop-ctrl';
@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  movies: any[] = [];
  posters: any[] = [];


  constructor(private moviesProvider: MoviesProvider, private popCrlProvider: PopCtrlProvider) {
    this.popCrlProvider.clickedOption.subscribe((value) =>{
      this.chooseList(value);
    });
  }

  ionViewWillEnter() {
    this.popCrlProvider.tabOptions = ['Popular','Now playing','Top rated','upcoming'];
  }


  chooseList(str){
    if(this.popCrlProvider.activeTab === 'MOVIES'){
      switch(str) {
        case "Popular":
          this.loadPopular();
          break;
        case "Now playing":
          this.loadNowPlaying();
          break;
        case "Top rated":
          this.loadTopRated();
          break;
        case "upcoming":
          this.loadUpcoming();
          break;
        default:
          console.log("none possible option");
      }
    }
  }


  loadPopular() {
    this.moviesProvider.getPopular().subscribe(
      data => {
        const array0 = data[0].results;
        const array1 = data[1].results;
        const array2 = data[2].results;
        this.movies = array0.concat(array1).concat(array2);

        this.posters = [];
        for (let movie of this.movies){
           this.posters.push('http://image.tmdb.org/t/p/w185//'+movie.poster_path)
        }
      },
      err => {console.log(err)}
    )
  }

  loadNowPlaying() {
    this.moviesProvider.getNowPlaying().subscribe(
      data => {
        const array0 = data[0].results;
        const array1 = data[1].results;
        const array2 = data[2].results;
        this.movies = array0.concat(array1).concat(array2);

        this.posters = [];
        for (let movie of this.movies){
          this.posters.push('http://image.tmdb.org/t/p/w185//'+movie.poster_path)
        }
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

        this.posters = [];
        for (let movie of this.movies){
          this.posters.push('http://image.tmdb.org/t/p/w185//'+movie.poster_path)
        }
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

        this.posters = [];
        for (let movie of this.movies){
          this.posters.push('http://image.tmdb.org/t/p/w185//'+movie.poster_path)
        }
      },
      err => {console.log(err)}
    )
  }
}
