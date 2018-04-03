import {Component, Input} from '@angular/core';
import {Base} from "../../pages/base";

@Component({
  selector: 'movie-resource',
  templateUrl: 'movie-resource.html'
})
export class MovieResourceComponent extends Base {

  @Input() resources: any;

}
