import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MovieCardComponent} from './movie-card/movie-card';
import {MovieResourceComponent} from './movie-resource/movie-resource';
import { NovelCardComponent } from './novel-card/novel-card';

@NgModule({
  declarations: [MovieCardComponent,
    MovieResourceComponent,
    NovelCardComponent,],
  imports: [IonicModule],
  exports: [MovieCardComponent,
    MovieResourceComponent,
    NovelCardComponent,]
})
export class ComponentsModule {
}
