import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";

@IonicPage()
@Component({
  selector: 'page-movie-resources',
  templateUrl: 'movie-resources.html',
})
export class MovieResourcesPage extends Base {


  resources: any = [];
  resources_source = '0';

  ionViewDidLoad() {
    this.resources = this.subResources(this.navParams.data);
  }
}
