import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NovelSearchPage} from './novel-search';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    NovelSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(NovelSearchPage),
    ComponentsModule
  ],
})
export class NovelSearchPageModule {
}
