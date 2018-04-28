import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchBarProvider} from '../../providers/shared-data/search-bar.provider';
import {MultiSearchProvider} from '../../providers/rest-tmdb/multi-search';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  resultArr : any[] = [];
  resultPosters: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchBarProvider: SearchBarProvider,
    private multiSearchProvider: MultiSearchProvider
  ) {
    this.searchBarProvider.searchString.subscribe((value) =>{
      this.loadSearchResults(value);
    });
  }

  loadSearchResults(val: string) {
    if (val && val.trim() != ''){
      this.multiSearchProvider.getSearchResults(val).subscribe(
        data => {
          this.resultArr = data.results;
          console.log(this.resultArr);

          this.resultPosters = [];
          for (let movie of this.resultArr){
            this.resultPosters.push('http://image.tmdb.org/t/p/w185//'+movie.poster_path)
          }
        },
        err => {console.log(err)}
      )
    } else {
      this.resultPosters = [];
    }
  }

}
