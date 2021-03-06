import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";

@IonicPage()
@Component({
  selector: 'page-novel-list',
  templateUrl: 'novel-list.html',
})
export class NovelListPage extends Base {
  user_novel_forks = {};
  novel_list = {};
  items = [];

  ionViewWillEnter() {
    this.getUserNovelForks();
    this.getNovelForks();
  }

  /**
   * 获取用户已经添加的书籍
   */
  getUserNovelForks() {
    let token = localStorage['token'];
    if (!token) {
      return;
    }
    let user = JSON.parse(localStorage['user']);
    let url = this.service.api.novel_fork;
    this.service.http.get(url, {params: {user__id: user['id']}}).subscribe(
      result => {
        this.user_novel_forks = result;
      },
      error => {
        this.handleError(error);
      }
    );
  }

  fork(item) {
    this.showLoading('正在标记中...');
    let url = this.service.api.novel_fork_fork.replace('${id}', item['id']);
    this.service.http.get(url).subscribe(
      result => {
        this.hideLoading();
        this.presentToast(result['success']);
        this.getUserNovelForks();
      },
      error => {
        this.hideLoading();
        this.handleError(error);
      }
    );
  }

  getNovelForks() {
    let url = this.service.api.novel;
    this.service.http.get(url, {params: {}}).subscribe(
      result => {
        this.novel_list = result;
      },
      error => {
        this.handleError(error);
      }
    );
  }


  // 下拉刷新
  doRefresh(refresher) {
    this.getUserNovelForks();
    this.getNovelForks();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }
}
