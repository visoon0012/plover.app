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

  movies = {
    next: null,
    results: [],
  };
  resources = {
    next: null,
    results: [],
  };
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
      this.movies = {
        next: null,
        results: [],
      };
      this.getMovies();
    }
    else if (this.page == 'resource') {
      this.resources = {
        next: null,
        results: [],
      };
      this.getResources();
    }
    else if (this.page == 'bt') {
    }
  }

  getMovies() {
    let url = '';
    if (this.movies.next == null) {
      url = this.service.api.movie_simple + `?search=${this.keywords}`;
    } else {
      url = this.movies.next;
    }
    if (url == '') {
      this.presentToast('没有下一页了');
      return;
    }
    this.service.http.get(url).subscribe(
      data => {
        this.movies['count'] = data['count'];
        this.movies['next'] = data['next'];
        this.movies['results'] = this.movies['results'].concat(data['results']);
        // 去重
        this.movies['results'] = this.listToSet(this.movies['results']);
        // 设置高度
        this.changeImgHeight(this.movies['results']);
        this.hideLoading();
      },
      error => {
        this.hideLoading();
        this.handleError(error)
      }
    );
  }

  getResources() {
    let url = '';
    if (this.resources.next == null) {
      url = this.service.api.movie_resource + `?search=${this.keywords}`;
    } else {
      url = this.resources.next;
    }
    if (url == '') {
      this.presentToast('没有下一页了');
      return;
    }
    this.service.http.get(url).subscribe(
      data => {
        this.resources['count'] = data['count'];
        this.resources['next'] = data['next'];
        this.resources['results'] = this.resources['results'].concat(data['results']);
        this.hideLoading();
      },
      error => {
        this.hideLoading();
        this.handleError(error)
      }
    );
  }

  // 去重
  listToSet(movies) {
    let douban_id_list = [];
    let data_list = [];
    for (let i in movies) {
      let movie = movies[i];
      if (douban_id_list.indexOf(movie['douban_id']) == -1) {
        douban_id_list.push(movie['douban_id']);
        data_list.push(movie);
      }
    }
    return data_list;
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
    if (this.page == 'new') {
      this.getNew();
    } else if (this.page == 'resource') {
      this.getResources();
    } else if (this.page == 'movie') {
      this.getMovies();
    }
    setTimeout(() => {
      ionInfinite.complete();
    }, 3000);
  }
}
