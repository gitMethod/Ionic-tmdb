import { Component} from '@angular/core';
import {Events, IonicPage} from 'ionic-angular';
import {ListsRest} from '../../providers/rest-tmdb/lists-rest';
import {ActiveData} from '../../providers/shared-data/active-data';
import {MoviesData} from '../../providers/shared-data/movies-data';

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  moviesTab;
  listShowed;
  movies = [];
  infiniteScrollStatus = true;

  constructor(private moviesProvider: ListsRest, private moviesObs: MoviesData, private activeData: ActiveData) {

    moviesObs.moviesObservable.subscribe((value) =>{
      this.moviesTab = value;
      this.listShowed = this.moviesTab.listArray[0];
      this.movies = [];
      this.loadList();
    });
  }

  counter: number = 0;

  loadList(infiniteScroll?) {
    this.moviesProvider.getList(this.listShowed, this.moviesTab.name).subscribe(
      data => {
        this.listShowed.responsePage += 3;
        this.counter += data.length;
        this.movies = this.movies.concat(data);

        if(this.counter < 9)
        {
          this.loadList(infiniteScroll);
        } else if(this.listShowed.responsePage >= 1000) {
          this.infiniteScrollStatus = false;
          console.log(this.infiniteScrollStatus);
        } else {
          this.counter = 0;
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
        }
      },
      err => {
        console.log( err );
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      },
    )
  }

  ionViewWillEnter(){
    this.activeData.activeTab = this.moviesTab;
    this.activeData.activeList = this.listShowed;
  }

}
