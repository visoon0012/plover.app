import { Component, Input } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from 'ionic-angular';
import { MovieDetailPage } from '../../pages/movie/movie-detail/movie-detail';

@Component({
  selector: 'movie-card',
  templateUrl: 'movie-card.html'
})
export class MovieCardComponent {

  @Input() item: any;
  @Input() width;
  @Input() height;

  constructor(
    public navCtrl: NavController,
  ) { }

  goMovie(item) {
    this.navCtrl.push('MovieDetailPage', item);
  }

}
