import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ActiveTab} from '../../providers/shared-data/active-tab';
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
              private activeTab: ActiveTab,
              private moviesData: MoviesData) {
    this.showedTab = activeTab.activeTab;
    this.menuIndex = activeTab.activeTab.listShowedIdx;
    this.showedList = this.showedTab.listArray[this.menuIndex];
    this.knobValues.upper = this.showedList.maxRange;
    this.knobValues.lower = this.showedList.minRange;
  }

  checkedRadio(idx){
    this.showedList = this.showedTab.listArray[idx];
    this.knobValues = {
      upper: this.showedList.maxRange,
      lower: this.showedList.minRange
    };
    this.menuIndex = idx;
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    if(this.menuIndex != this.showedTab.listShowedIdx ||
       this.showedList.maxRange != this.knobValues.upper ||
       this.showedList.minRange != this.knobValues.lower
    ){
      this.showedTab.listShowedIdx = this.menuIndex;
      this.showedList.responsePage = 1;
      this.showedList.maxRange = this.knobValues.upper;
      this.showedList.minRange = this.knobValues.lower;
      this.showedTab.listArray[this.menuIndex] = this.showedList;
      this.saveToObservable();
    }
    this.navCtrl.pop();
  }

  saveToObservable(){
    if (this.showedList.name === 'Popular'){
      this.moviesData.moviesObservable.next(this.showedTab)
    }
  }

}
