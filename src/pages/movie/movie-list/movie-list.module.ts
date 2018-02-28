import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieListPage } from './movie-list';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    MovieListPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieListPage),
    ComponentsModule
  ],
})
export class MovieListPageModule { }
