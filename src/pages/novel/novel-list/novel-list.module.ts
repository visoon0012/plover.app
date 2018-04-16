import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovelListPage } from './novel-list';

@NgModule({
  declarations: [
    NovelListPage,
  ],
  imports: [
    IonicPageModule.forChild(NovelListPage),
  ],
})
export class NovelListPageModule {}
