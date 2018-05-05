import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListProvider} from '../../providers/shared-data/list.provider';
import {Tab} from '../../models/tab';


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  knobValues: any = {
    upper:2018,
    lower:1990
  };

  menuCurrentTab: Tab;
  menuIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private listProvider: ListProvider) {

    this.menuCurrentTab = listProvider.providerCurrentTab.getValue();
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    this.menuCurrentTab.optionSelected = this.menuIndex;
    this.menuCurrentTab.listArray[this.menuIndex].responsePage = 1;
    this.listProvider.providerCurrentTab.next(this.menuCurrentTab);
    this.navCtrl.pop();
  }

}
