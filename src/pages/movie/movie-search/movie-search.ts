import {Component} from '@angular/core';
import {
  IonicPage,
} from 'ionic-angular';
import {Base} from '../../base';

@IonicPage()
@Component({
  selector: 'page-movie-search',
  templateUrl: 'movie-search.html',
})
export class MovieSearchPage extends Base {

  movie_list: any = [];
  resource_list: any = [];
  resource_source = '0';
  resource_new = {
    items: [],
    next: '',
  };
  bt_list: any = [];

  page = 'new';

  keywords = '';

  ionViewDidLoad() {
    this.getNew();
  }

  search(ev: any) {
    if (this.page == 'new') {
      this.presentToast('最新资源不支持搜索');
      return;
    }
    if (this.keywords == '') {
      return;
    }
    this.showLoading('正在加载中...');
    if (this.page == 'movie') {
      let url = this.service.api.movie_search + `?keywords=${this.keywords}`;
      this.service.http.get(url).subscribe(
        data => {
          this.movie_list = data;
          this.changeImgHeight(this.movie_list);
          this.hideLoading();
        },
        error => {
          this.hideLoading();
          this.handleError(error)
        }
      );
    }
    else if (this.page == 'resource') {
      let url = this.service.api.movie_resource_search + `?keywords=${this.keywords}`;
      this.service.http.get(url).subscribe(
        data => {
          this.resource_list = data;
          this.hideLoading();
        },
        error => {
          this.hideLoading();
          this.handleError(error)
        }
      );
    }
    else if (this.page == 'bt') {
    }
  }

  getNew() {
    let url = '';
    if (this.resource_new.next == '') {
      url = this.service.api.movie_resource;
    }
    else {
      url = this.resource_new.next;
    }
    this.service.http.get(url).subscribe(
      data => {
        this.resource_new.items = this.resource_new.items.concat(data['results']);
        this.resource_new.next = data['next'];
        this.hideLoading();
      },
      error => {
        this.hideLoading();
        this.handleError(error)
      }
    );
  }

  // 设置图片高度统一
  imgSize = {
    width: 0,
    height: 0,
  };

  changeImgHeight(items) {
    if (this.imgSize.width == 0) {
      let item = document.getElementById('ion-col-width');
      this.imgSize.width = item.clientWidth;
    }
    let cover_x = 0;
    let cover_y = 0;
    for (let i in items) {
      cover_x += items[i].cover_x;
      cover_y += items[i].cover_y;
    }
    this.imgSize.height = this.imgSize.width * (cover_y / cover_x);
  }

  // 上拉 加载
  doInfinite(ionInfinite) {
    this.getNew();
    setTimeout(() => {
      ionInfinite.complete();
    }, 3000);
  }
}
