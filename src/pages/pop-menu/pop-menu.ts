import { Component } from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {PopCtrlProvider} from '../../providers/shared-data/pop-ctrl';



@IonicPage()
@Component({
  selector: 'page-movies-pop-ctrl',
  templateUrl: 'pop-menu.html',
})
export class MoviesPopCtrlPage {

  optionsShowed: any[];
  headerShowed: any;

  constructor(public viewCtrl: ViewController, private popCtrlProvider: PopCtrlProvider) {
    this.optionsShowed = popCtrlProvider.tabOptions;
    this.headerShowed = popCtrlProvider.activeTab + ' LISTS';
  }

  close(event) {
    this.popCtrlProvider.clickedOption.next(event.target.textContent);
    this.viewCtrl.dismiss();
  }
}
