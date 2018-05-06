import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListProvider} from '../../providers/shared-data/list.provider';
import {Tab} from '../../models/tab';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'filterModal.html',
})
export class CalendarPage {

  knobValues: any = {
    upper:2018,
    lower:1990
  };

  showedTab: Tab;
  menuIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private listProvider: ListProvider) {
    this.showedTab = listProvider.providerCurrentTab.getValue();
    this.menuIndex = listProvider.providerCurrentTab.getValue().listShowedIdx;
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    if(this.menuIndex != this.listProvider.providerCurrentTab.getValue().listShowedIdx){
      this.showedTab.listShowedIdx = this.menuIndex;
      this.showedTab.listArray[this.menuIndex].responsePage = 1;
      this.listProvider.providerCurrentTab.next(this.showedTab);
    }
    this.navCtrl.pop();
  }

}
