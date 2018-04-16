import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MovieResourcesPage} from './movie-resources';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    MovieResourcesPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieResourcesPage),
    ComponentsModule
  ],
})
export class MovieResourcesPageModule {
}
