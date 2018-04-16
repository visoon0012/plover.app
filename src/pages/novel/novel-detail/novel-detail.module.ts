import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovelDetailPage } from './novel-detail';

@NgModule({
  declarations: [
    NovelDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NovelDetailPage),
  ],
})
export class NovelDetailPageModule {}
