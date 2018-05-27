import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ListsRest} from '../../providers/rest-tmdb/lists-rest';
import {PeopleDataProvider} from '../../providers/shared-data/people-data';
import {AppList} from '../../models/app-list';
import {ItemDetailsPage} from '../item-details/item-details';
import {AppTab} from '../../models/app-tab';
import {convertDeepLinkConfigEntriesToString} from '@ionic/app-scripts/dist/deep-linking/util';


@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  tabShowed: AppTab;
  listShowed: AppList;
  people = [];
  infiniteScrollStatus = true;
  rootNavCtrl: NavController;

  constructor(private listsRest: ListsRest, private peopleData: PeopleDataProvider, public navParams: NavParams,
              public navCtrl: NavController, private  app: App) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    peopleData.tabsObs.subscribe((value) =>{
      this.tabShowed = value;
    });
    peopleData.listObs.subscribe((value) => {
      this.listShowed = value;
      this.people = [];
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

  pushDetailsPage(i){
    this.rootNavCtrl.push(ItemDetailsPage,{

      'id': this.people[i].id,
      'poster': this.people[i].profile_path,
      'type': this.tabShowed.name,
      'ranking': i
    });
  }


}
