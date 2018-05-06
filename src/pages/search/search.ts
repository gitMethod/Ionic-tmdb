import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchBarProvider} from '../../providers/shared-data/search-bar.provider';
import {MultiSearchProvider} from '../../providers/rest-tmdb/search.provider';
import {Subscription} from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  resultArr : any[] = [];
  resultPosters: any[] = [];
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchBarProvider: SearchBarProvider,
    private multiSearchProvider: MultiSearchProvider
  ) {
    this.subscription = this.searchBarProvider.searchString.subscribe((value) =>{
      this.loadSearchResults(value);
    });
  }

  loadSearchResults(val: string) {
    if (val){
      this.multiSearchProvider.getSearchResults(val).subscribe(
        data => { this.resultArr = data},
        err => {console.log(err)}
      )
    } else {
      this.resultPosters = [];
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
