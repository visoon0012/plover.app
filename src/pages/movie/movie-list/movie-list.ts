import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  Content
} from 'ionic-angular';
import {MovieDetailPage} from '../movie-detail/movie-detail';
import {MovieSearchPage} from '../movie-search/movie-search';
import {Base} from "../../base";


@IonicPage()
@Component({
  selector: 'page-movie-list',
  templateUrl: 'movie-list.html',
})
export class MovieListPage extends Base {


  @ViewChild(Content) content: Content;

  tags = {
    movie: [
      {type: 'movie', tag: '热门', name: '热门'},
      {type: 'movie', tag: '最新', name: '最新'},
      {type: 'movie', tag: '经典', name: '经典'},
      {type: 'movie', tag: '豆瓣高分', name: '高分'},
      {type: 'movie', tag: '动作', name: '动作'},
      {type: 'movie', tag: '喜剧', name: '喜剧'},
      {type: 'movie', tag: '爱情', name: '爱情'},
      {type: 'movie', tag: '科幻', name: '科幻'},
      {type: 'movie', tag: '悬疑', name: '悬疑'},
      {type: 'movie', tag: '恐怖', name: '恐怖'},
    ],
    tv: [
      {type: 'tv', tag: '热门', name: '热门'},
      {type: 'tv', tag: '美剧', name: '美剧'},
      {type: 'tv', tag: '英剧', name: '英剧'},
      {type: 'tv', tag: '韩剧', name: '韩剧'},
      {type: 'tv', tag: '日剧', name: '日剧'},
      {type: 'tv', tag: '国产剧', name: '国剧'},
      {type: 'tv', tag: '港剧', name: '港剧'},
      {type: 'tv', tag: '日本动画', name: '动漫'},
      {type: 'tv', tag: '综艺', name: '综艺'},]
  };

  list = [];

  config = {
    'type': 'movie',
    'tag': '热门',
    'next': null,
  };

  imgSize = {
    width: 0,
    height: 0,
  };

  ionViewDidLoad() {
    this.getInfo();
    this.checkUpdate();
  }

  getInfo() {
    this.getMovieSimpleList();
  }

  getMovieSimpleList() {
    let url = '';
    if (this.config.next == null) {
      let type = this.config.type;
      let tag = this.config.tag;
      url = this.service.api.movie_simple + `?douban_type=${type}&douban_tag=${tag}`;
    } else {
      url = this.config.next;
      this.config.next = '';
    }
    this.service.http.get(url).subscribe(
      data => {
        this.config.next = data['next'];
        this.list = this.list.concat(data['results']);
        // this.getImg();
        this.changeImgHeight();
      },
      error => {
      }
    );
  }

  // 统一图片高度
  changeImgHeight() {
    if (this.imgSize.width == 0) {
      let item = document.getElementById('ion-col-width');
      this.imgSize.width = item.clientWidth;
    }
    let cover_x = 0;
    let cover_y = 0;
    for (let i in this.list) {
      cover_x += this.list[i].cover_x;
      cover_y += this.list[i].cover_y;
    }
    this.imgSize.height = this.imgSize.width * (cover_y / cover_x);
  }

  getImg() {
    for (let i in this.list) {
      if (this.list[i]['cover'].indexOf('doubanio') != -1) {
        this.service.http.post(this.service.api.movie_simple_image, {url: this.list[i]['cover']}).subscribe(
          data => {
            this.list[i]['cover'] = this.service.plover_img + data['image_url'].substring(8);
          },
          error => {
          }
        );
      }
    }
  }

  changeType(type) {
    this.content.scrollToTop();
    this.config.type = type;
    this.config.tag = '热门';
    this.config.next = null;
    // 重置列表
    this.list = [];
    // 获取数据
    this.getInfo();
  }

  changeTag(tag) {
    this.content.scrollToTop();
    this.config.tag = tag;
    this.config.next = null;
    // 重置列表
    this.list = [];
    // 获取数据
    this.getInfo();
  }

  goMovie(item) {
    this.navCtrl.push('MovieDetailPage', item);
  }

  goSearch() {
    this.navCtrl.push('MovieSearchPage');
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.list = [];
    this.config.next = null;
    this.getInfo();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

  // 上拉 加载
  doInfinite(ionInfinite) {
    this.getMovieSimpleList();
    setTimeout(() => {
      ionInfinite.complete();
    }, 3000);
  }
}
