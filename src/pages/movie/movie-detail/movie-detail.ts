import {Component} from '@angular/core';
import {
  IonicPage,
} from 'ionic-angular';
import {Base} from '../../base';

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage extends Base {

  douban_id = null;
  page = 'info';
  item: any = {
    'images': {},
    'rating': {}
  };
  resources: any = [];
  resources_source = '0';

  ionViewDidLoad() {
    this.douban_id = this.navParams.get('douban_id');
    this.resources = this.subResources(this.navParams.data.resources);
    this.getInfo();
  }

  getInfo() {
    let url = this.service.api.movie_detail + `?douban_id=${this.douban_id}`;
    this.service.http.get(url).subscribe(
      (data) => {
        this.item = data;
        // 获取图片
        // this.service.http.post(this.service.api.movie_image, { url: this.item['images']['large'] }).subscribe(
        //   data => {
        //     this.item['images']['large'] = this.service.plover_img + data['image_url'].substring(8);
        //   },
        //   error => {
        //   }
        // );
        // 获取资源
        // let keywords = data['title'].split(/\[]\(\)（）{}【】'",[.]，。？?-+=!@#$%~`·/).toString().replace(',', ' ');
        // url = this.service.api.movie_resource + `?search=${keywords}`;
        // this.service.http.get(url).subscribe(
        //   (data) => {
        //     this.resources = data;
        //   },
        //   (error) => {
        //   }
        // );
      },
      (error) => {
      }
    );
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getInfo();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }
}
