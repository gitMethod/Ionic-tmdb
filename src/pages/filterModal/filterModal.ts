import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppTab} from '../../models/app-tab';
import {AppList} from '../../models/app-list';
import {MoviesData} from '../../providers/shared-data/movies-data';
import {TvDataProvider} from '../../providers/shared-data/tv-data';
import {PeopleDataProvider} from '../../providers/shared-data/people-data';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'filterModal.html',
})
export class FilterModalPage {

  showedList: AppList;
  showedTab: AppTab;
  menuIndex: number;
  tabindex: any = '';

  knobValues: any = {
    upper: 0,
    lower: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
    private peopleData: PeopleDataProvider, private moviesData: MoviesData, private tvData: TvDataProvider) {

    this.tabindex = this.navParams.get('activeTab');
    console.log(this.tabindex);
    this.showedTab = this.findActiveData().tabsObs.getValue();
    this.showedList = this.findActiveData().listObs.getValue();
    this.menuIndex = this.findListIndex(this.showedList);
    this.knobValues.upper = (this.showedList.maxRange).toString().substr(0, 4);
    this.knobValues.lower = this.showedList.minRange;
  }

  checkedRadio(idx){
    this.showedList = this.showedTab.listArray[idx];
    this.knobValues = {
      upper: this.showedList.maxRange.toString().substr(0, 4),
      lower: this.showedList.minRange
    };
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    if(this.menuIndex != this.findListIndex(this.showedList) ||
       this.showedList.maxRange != this.knobValues.upper ||
       this.showedList.minRange != this.knobValues.lower
    ){
      this.showedList.responsePage = 1;
      this.showedList.maxRange = this.knobValues.upper +'-12-31';
      this.showedList.minRange = this.knobValues.lower;
      this.showedTab.listArray[this.findListIndex(this.showedList)] = this.showedList;
      this.findActiveData().tabsObs.next(this.showedTab);
      this.findActiveData().listObs.next(this.showedList);
    }
    this.navCtrl.pop();
  }

  findListIndex(appList: AppList){
    return this.showedTab.listArray.findIndex( item => item === appList);
  }

  rangeStatus(){
    return ( this.showedList.name === 'Up coming'
      || this.showedList.name === 'Now playing'
      || this.showedList.name === 'Airing today'
      || this.showedList.name === 'On the air'
      || this.showedTab.name === 'PEOPLE'
    );
  }

  findActiveData(){
    console.log(this.tabindex);
    switch (this.tabindex + ''){
      case '0':
        return this.moviesData;
      case '1':
        return this.tvData;
      case '2':
        return this.peopleData;
      default:

    }
  }



}
