import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PopCtrlProvider} from '../../providers/shared-data/pop-ctrl.provider';


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

  optionsShowed: any[];
  headerShowed: any;
  radioCheckedValue: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private popCtrlProvider: PopCtrlProvider) {
    this.optionsShowed = popCtrlProvider.tabOptions;
    this.headerShowed = popCtrlProvider.activeTab;
    this.radioCheckedValue = popCtrlProvider.checkedOption.getValue();
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    this.popCtrlProvider.checkedOption.next(this.radioCheckedValue);
    this.navCtrl.pop();
  }

}
