import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListsRest} from '../../providers/rest-tmdb/lists-rest';
import {ActiveData} from '../../providers/shared-data/active-data';
import {MoviesData} from '../../providers/shared-data/movies-data';
import {PeopleDataProvider} from '../../providers/shared-data/people-data';


@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  peopleTab;
  listShowed;
  people = [];
  infiniteScrollStatus = true;

  constructor(private listsRest: ListsRest, private peopleDataProvider: PeopleDataProvider, private activeData: ActiveData) {
    peopleDataProvider.peopleObservable.subscribe((value) =>{
      this.peopleTab = value;
      this.listShowed = this.peopleTab.listArray[0];
      this.people = [];
      this.loadList();
    });
  }

  loadList(infiniteScroll?) {
    this.infiniteScrollStatus = true;
    this.listsRest.getList(this.listShowed, this.peopleTab.name).subscribe(
      data => {
        if(data.length <= 0 || this.listShowed.responsePage >= 1000){
          this.infiniteScrollStatus = false;
        } else {
          this.people = this.people.concat(data);
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

  ionViewWillEnter(){
    this.activeData.activeTab = this.peopleTab;
    this.activeData.activeList = this.listShowed;
  }




}
