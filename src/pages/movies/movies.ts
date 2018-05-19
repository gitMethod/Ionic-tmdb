import { Component} from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
import {ListsRest} from '../../providers/rest-tmdb/lists-rest';
import {MoviesData} from '../../providers/shared-data/movies-data';
import {ItemDetailsPage} from '../item-details/item-details';
import {AppTab} from '../../models/app-tab';
import {AppList} from '../../models/app-list';

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {

  tabShowed: AppTab;
  listShowed: AppList;
  movies = [];
  infiniteScrollStatus = true;

  constructor(private listsRest: ListsRest, private moviesData: MoviesData,
              public navCtrl: NavController, private  app: App) {
    moviesData.tabsObs.subscribe((value) =>{
      this.tabShowed = value;
    });
    moviesData.listObs.subscribe((value) => {
      this.listShowed = value;
      this.movies = [];
      this.loadList();
    });
  }

  loadList(infiniteScroll?) {
    this.infiniteScrollStatus = true;
    this.listsRest.getList(this.listShowed, this.tabShowed.name).subscribe(
      data => {
        if(data.length <= 0 || this.listShowed.responsePage >= 1000){
          this.infiniteScrollStatus = false;
        } else {
          this.movies = this.movies.concat(data);
          this.listShowed.responsePage += 3;
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

  pushDetailsPage(){
    this.app.getRootNav().push(ItemDetailsPage);
  }

}
