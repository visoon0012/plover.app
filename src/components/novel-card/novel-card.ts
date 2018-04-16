import {Component, Input} from '@angular/core';


@Component({
  selector: 'novel-card',
  templateUrl: 'novel-card.html'
})
export class NovelCardComponent {

  @Input() item: any;
  @Input() width;
  @Input() height;
}
