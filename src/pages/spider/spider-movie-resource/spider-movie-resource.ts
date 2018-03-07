import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';


@IonicPage()
@Component({
  selector: 'page-spider-movie-resource',
  templateUrl: 'spider-movie-resource.html',
})
export class SpiderMovieResourcePage extends Base {

  processingMovieList() {
    this.service.http.get(this.service.api.processing_index, {}).subscribe((data) => {
      this.presentToast('更新完成');
    }, (error) => {
      this.presentToast('发生错误');
    });
  }

  processingMovieDetail(item: any) {
    this.service.http.get(this.service.api.processing_detail, {}).subscribe((data) => {
      this.presentToast('更新完成');
    }, (error) => {
      this.presentToast('发生错误');
    });
  }
}
