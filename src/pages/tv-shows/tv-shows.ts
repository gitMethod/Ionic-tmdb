import { Component } from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
import {ListsRest} from '../../providers/rest-tmdb/lists-rest';
import {TvDataProvider} from '../../providers/shared-data/tv-data';
import {AppList} from '../../models/app-list';
import {ItemDetailsPage} from '../item-details/item-details';
import {AppTab} from '../../models/app-tab';

@IonicPage()
@Component({
  selector: 'page-tv-shows',
  templateUrl: 'tv-shows.html',
})
export class TvShowsPage {

  tabShowed: AppTab;
  listShowed: AppList;
  tvs = [];
  infiniteScrollStatus = true;

  constructor(private listsRest: ListsRest, private tvData: TvDataProvider,
              public navCtrl: NavController, private  app: App) {
    tvData.tabsObs.subscribe((value) =>{
      this.tabShowed = value;
    });
    tvData.listObs.subscribe((value) => {
      this.listShowed = value;
      this.tvs = [];
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
          this.tvs = this.tvs.concat(data);
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

  pushDetailsPage(i){
    this.app.getRootNav().push(ItemDetailsPage,{
      'id': this.tvs[i].id,
      'poster': this.tvs[i].poster_path,
      'type': this.tabShowed.name});
  }


}
