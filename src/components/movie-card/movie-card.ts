import {Component, Input} from '@angular/core';

@Component({
  selector: 'movie-card',
  templateUrl: 'movie-card.html'
})
export class MovieCardComponent {

  @Input() item: any;
  @Input() width;
  @Input() height;

}
