import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieSearchPage } from './movie-search';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    MovieSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieSearchPage),
    ComponentsModule
  ],
})
export class MovieSearchPageModule {}
