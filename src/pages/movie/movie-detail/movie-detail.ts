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

  /************ 用户评论 ************/
  movie_simple: any = {};
  page = 'info';
  item: any = {
    'images': {},
    'rating': {}
  };
  resources: any = [];
  resources_source = '0';

  ionViewDidLoad() {
    this.movie_simple = this.navParams.data;
    this.resources = this.subResources(this.navParams.data.resources);
    this.getInfo();
    this.getUserMark();
    this.getMovieMarkList();
  }

  getInfo() {
    let url = this.service.api.movie_detail + `?douban_id=${this.movie_simple['douban_id']}`;
    this.service.http.get(url).subscribe(
      (data) => {
        this.item = data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  syncInfo() {
    // 让服务器同步豆瓣最新数据
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getInfo();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

  /************ 用户评论 ************/
  mark: any = {
    comment: '',
    is_fork: false,
    is_like: false,
    is_watch: false,
  };

  first_comment = false;

  getUserMark() {
    let url = this.service.api.movie_simple_mark;
    let user = JSON.parse(localStorage['user']);
    this.service.http.get(url, {
      params: {
        user__id: user.id,
        movie_simple__douban_id: this.movie_simple.douban_id
      }
    }).subscribe(
      result => {
        if (result['results'].length > 0) {
          this.mark = result['results'][0];
          this.first_comment = false;
        } else {
          this.first_comment = true;
        }
      },
      error => {
        this.handleError(error);
      }
    );
  }

  save(type) {
    let url = this.service.api.movie_simple_mark;
    if (type == 'comment') {
      if (this.mark.comment == '') {
        this.presentToast('请您写下评论');
        return;
      }
    }
    this.service.http.post(url, this.mark).subscribe(
      result => {
        this.getUserMark();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  /************ 用户评论列表 ************/

  movie_mark_data: any = {
    'next': null,
  };

  movie_mark_list = [];

  getMovieMarkList() {
    let url = '';
    if (this.movie_mark_data.next == null) {
      url = this.service.api.movie_simple_mark;
    } else {
      url = this.movie_mark_data.next;
      this.movie_mark_data.next = null;
    }
    this.service.http.get(url).subscribe(
      result => {
        this.movie_mark_data = result;
        this.movie_mark_list = this.movie_mark_list.concat(result['results']);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  // 上拉 加载
  doInfinite(ionInfinite) {
    this.getMovieMarkList();
    setTimeout(() => {
      ionInfinite.complete();
    }, 3000);
  }
}
