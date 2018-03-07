import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';


@IonicPage()
@Component({
  selector: 'page-spider-douban',
  templateUrl: 'spider-douban.html',
})
export class SpiderDoubanPage extends Base {

  config = {
    'type': 'movie',
    'tag': '热门',
  };

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

  updateMovieList() {
    let loader = this.loadingCtrl.create({
      content: "正在更新数据...",
      duration: 30 * 1000
    });
    loader.present();
    let url = this.service.api.movie_simple_spider + `?type=${this.config.type}&tag=${this.config.tag}`;
    this.service.http.get(url).subscribe(
      (data) => {
        loader.dismiss();
        this.showAlert('提示', '更新完毕');
      },
      (error) => {
      }
    );
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.updateMovieList();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

}

