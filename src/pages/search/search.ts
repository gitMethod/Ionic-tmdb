import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchBarProvider} from '../../providers/shared-data/search-bar.provider';
import {MultiSearchProvider} from '../../providers/rest-tmdb/multi-search';
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
        data => {
          this.resultArr = data.results;
          console.log(this.resultArr);
        },
        err => {console.log(err)}
      )
    } else {
      this.resultPosters = [];
    }
  }

  altImage(type, moviePath, personPath){
    if( type === 'movie'){
      if(moviePath === null){
        return 'assets/imgs/movie.png'
      } else {
        return "http://image.tmdb.org/t/p/w185/"+moviePath
      }
    } else if( type === 'person'){
      if(personPath === null){
        return 'assets/imgs/person.png'
      } else {
        return "http://image.tmdb.org/t/p/w185//"+personPath
      }
    } else if( type === 'tv'){
      if(moviePath == null){
        return 'assets/imgs/television.png'
      } else {
        return "http://image.tmdb.org/t/p/w185//"+moviePath
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
