import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ActiveData} from '../../providers/shared-data/active-data';
import {AppTab} from '../../models/app-tab';
import {AppList} from '../../models/app-list';
import {MoviesData} from '../../providers/shared-data/movies-data';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'filterModal.html',
})
export class FilterModalPage {

  showedList: AppList;
  showedTab: AppTab;
  menuIndex: number;

  knobValues: any = {
    upper: 0,
    lower: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dataTab: ActiveData,
              private moviesData: MoviesData) {
    this.showedTab = dataTab.activeTab;
    this.showedList = dataTab.activeList;
    this.menuIndex = this.findListIndex(dataTab.activeList);
    this.knobValues.upper = dataTab.activeList.maxRange;
    this.knobValues.lower = dataTab.activeList.minRange;

  }

  checkedRadio(idx){
    this.showedList = this.showedTab.listArray[idx];
    this.knobValues = {
      upper: this.showedList.maxRange,
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
      this.showedList.maxRange = this.knobValues.upper;
      this.showedList.minRange = this.knobValues.lower;
      this.showedTab.listArray[this.findListIndex(this.showedList)] = this.showedList;
      this.saveToObservable();
    }
    this.navCtrl.pop();
  }

  saveToObservable(){
    switch(this.showedTab.name) {
      case 'MOVIES': {
        this.moviesData.moviesObservable.next(this.showedTab);
        break; }
      case 'TV': {
        //statements;
        break; }
      case 'PEOPLE': {
        //statements;
        break; }
    }
  }

  findListIndex(appList: AppList){
    return this.showedTab.listArray.findIndex( item => item === this.showedList);
  }



}
