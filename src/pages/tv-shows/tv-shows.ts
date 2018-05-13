import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ActiveData} from '../../providers/shared-data/active-data';
import {ListsRest} from '../../providers/rest-tmdb/lists-rest';
import {TvDataProvider} from '../../providers/shared-data/tv-data';

@IonicPage()
@Component({
  selector: 'page-tv-shows',
  templateUrl: 'tv-shows.html',
})
export class TvShowsPage {

  tvTab;
  listShowed;
  tvs = [];
  infiniteScrollStatus = true;

  constructor(private listsRest: ListsRest, private tvData: TvDataProvider, private activeData: ActiveData) {
    tvData.tvObservable.subscribe((value) =>{
      this.tvTab = value;
      this.listShowed = this.tvTab.listArray[0];
      this.tvs = [];
      this.loadList();
    });
  }

  counter: number = 0;

  loadList(infiniteScroll?) {
    this.listsRest.getList(this.listShowed, this.tvTab.name).subscribe(
      data => {
        this.listShowed.responsePage += 3;
        this.counter += data.length;
        this.tvs = this.tvs.concat(data);

        if(this.counter < 9)
        {
          this.loadList(infiniteScroll);
        } else if(this.listShowed.responsePage >= 1000) {
          this.infiniteScrollStatus = false;
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
    this.activeData.activeTab = this.tvTab;
    this.activeData.activeList = this.listShowed;
  }

}
