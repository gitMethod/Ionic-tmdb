import { Component } from '@angular/core';
import {IonicPage, List, NavController, NavParams} from 'ionic-angular';
import {ListProvider} from '../../providers/shared-data/list.provider';
import {AppTab} from '../../models/app-tab';
import {AppList} from '../../models/app-list';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'filterModal.html',
})
export class CalendarPage {

  showedList: AppList;
  showedTab: AppTab;
  menuIndex: number;

  knobValues: any = {
    upper: 0,
    lower: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private listProvider: ListProvider) {
    this.showedTab = listProvider.providerCurrentTab.getValue();
    this.menuIndex = listProvider.providerCurrentTab.getValue().listShowedIdx;
    this.showedList = this.showedTab.listArray[this.showedTab.listShowedIdx];
    this.knobValues.upper = this.showedList.maxRange;
    this.knobValues.lower = this.showedList.minRange;
  }

  selectList(idx){
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
      this.listProvider.providerCurrentTab.next(this.showedTab);
    }
    this.navCtrl.pop();
  }

}
