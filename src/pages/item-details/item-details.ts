import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    document.querySelector("ion-navbar")['style'].display = 'none';
  }

  ionViewWillLeave() {
    document.querySelector("ion-navbar")['style'].display = 'flex';
  }



}
