import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesPopCtrlPage } from './pop-menu';

@NgModule({
  declarations: [
    MoviesPopCtrlPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesPopCtrlPage),
  ],
})
export class MoviesPopCtrlPageModule {}
