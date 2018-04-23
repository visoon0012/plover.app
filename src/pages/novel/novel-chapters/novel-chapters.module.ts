import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovelChaptersPage } from './novel-chapters';

@NgModule({
  declarations: [
    NovelChaptersPage,
  ],
  imports: [
    IonicPageModule.forChild(NovelChaptersPage),
  ],
})
export class NovelChaptersPageModule {}
