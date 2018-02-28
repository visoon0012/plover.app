import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDetailPage } from './movie-detail';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    MovieDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDetailPage),
    ComponentsModule
  ],
})
export class MovieDetailPageModule {}
