import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppList} from '../../models/app-list';
import {AppTab} from '../../models/app-tab';
import {AppSettings} from '../../models/app-settings';
import {ListProvider} from '../../providers/shared-data/list.provider';
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

  constructor(private moviesProvider: MoviesProvider, private listProvider: ListProvider) {

    let tvPopular: AppList = {
      name: 'Popular', responsePage: 1, apiUrl: AppSettings.TV_POPULAR,
      maxRange:(new Date()).getFullYear(), minRange: 1900 };
    let tvTopRated: AppList = {
      name: 'Top rated', responsePage: 1, apiUrl: AppSettings.TV_TOP_RATED,
      maxRange:(new Date()).getFullYear(), minRange: 1900};
    let tvOnTheAir: AppList = {
      name: 'On the air', responsePage: 1, apiUrl: AppSettings.TV_ON_THE_AIR,
      maxRange:(new Date()).getFullYear(), minRange: 1900};
    let tvAiringToday: AppList = {
      name: 'Airing Today', responsePage: 1, apiUrl: AppSettings.TV_AIRING_TODAY,
      maxRange:(new Date()).getFullYear(), minRange: 1900};

    this.tvsTab = {
      name: 'TV',
      listArray: [tvPopular, tvTopRated, tvOnTheAir, tvAiringToday],
      listShowedIdx: 0
    };

    this.listProvider.providerCurrentTab.next(this.tvsTab);

    this.listProvider.providerCurrentTab.subscribe((value) =>{
      this.tvsTab = value;
      this.tvListShowed = value.listArray[value.listShowedIdx];
      this.tvs = [];
      this.loadList();
    });
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
