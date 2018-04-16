import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovelReadPage } from './novel-read';

@NgModule({
  declarations: [
    NovelReadPage,
  ],
  imports: [
    IonicPageModule.forChild(NovelReadPage),
  ],
})
export class NovelReadPageModule {}
