import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MovieCardComponent} from './movie-card/movie-card';
import {MovieResourceComponent} from './movie-resource/movie-resource';

@NgModule({
  declarations: [MovieCardComponent,
    MovieResourceComponent,],
  imports: [IonicModule],
  exports: [MovieCardComponent,
    MovieResourceComponent,]
})
export class ComponentsModule {
}
