import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppList} from '../../models/app-list';
import {AppTab} from '../../models/app-tab';
import {ActiveData} from '../../providers/shared-data/active-data';
import {MoviesProvider} from '../../providers/rest-tmdb/movies.provider';

@IonicPage()
@Component({
  selector: 'page-tv-shows',
  templateUrl: 'tv-shows.html',
})
export class TvShowsPage {

  tvs = [];
  tvListShowed: AppList;
  tvsTab: AppTab;
  infiniteScrollStatus = true;

  constructor(private moviesProvider: MoviesProvider, private listProvider: ActiveData) {



  }

  counter: number = 0;

  loadList(infiniteScroll?) {
    this.moviesProvider.getList(this.tvListShowed, this.tvsTab.name).subscribe(
      data => {
        this.tvListShowed.responsePage += 3;
        this.counter += data.length;
        this.tvs = this.tvs.concat(data);

        if(this.counter < 9)
        {
          this.loadList(infiniteScroll);
        } else if(this.tvListShowed.responsePage >= 1000) {
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

}
