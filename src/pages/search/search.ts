import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SearchBarProvider} from '../../providers/shared-data/search-bar.provider';
import {MultiSearchProvider} from '../../providers/rest-tmdb/search-rest';
import {Subscription} from 'rxjs/Subscription';
import {ItemDetailsPage} from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  resultArr: any[] = [];
  resultPosters: any[] = [];
  subscription: Subscription;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private searchBarProvider: SearchBarProvider,
    private multiSearchProvider: MultiSearchProvider, private  app: App
  ) {
    this.subscription = this.searchBarProvider.searchString.subscribe((value) => {
      this.loadSearchResults(value);
    });
  }

  loadSearchResults(val: string) {
    if (val) {
      this.multiSearchProvider.getSearchResults(val).subscribe(
        data => {
          console.log(data);
          this.resultArr = data
        },
        err => {
          console.log(err)
        }
      )
    } else {
      this.resultPosters = [];
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pushDetailsPage(i){
    this.app.getRootNav().push(ItemDetailsPage,{
      'id': this.resultArr[i].id,
      'poster': ( this.resultArr[i].poster_path ? this.resultArr[i].poster_path : this.resultArr[i].profile_path),
      'type': this.resultArr[i].media_type,
      'ranking': i
    });
  }

}

