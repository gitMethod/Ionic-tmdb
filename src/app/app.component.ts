import { Component } from '@angular/core';
import { Platform, PopoverController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {MoviesPopCtrlPage} from '../pages/pop-menu/pop-menu';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private popOverCtrl: PopoverController
              ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  presentPopover(myEvent) {
    let popover = this.popOverCtrl.create(MoviesPopCtrlPage);
    popover.present({ev:myEvent});
  }
}

