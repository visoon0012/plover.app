import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage} from 'ionic-angular';
import {Base} from "../../base";
import {isUndefined} from "ionic-angular/util/util";
import {NovelChaptersPage} from "../novel-chapters/novel-chapters";

@IonicPage()
@Component({
  selector: 'page-novel-read',
  templateUrl: 'novel-read.html',
})
export class NovelReadPage extends Base {
  page = 'content';
  show = false;
  item = {};
  data = {};
  style = {
    fontSize: 18,
    lineHeight: 36,
  };


  ionViewDidLoad() {
    this.item = this.navParams.data;
    this.getContent(false, false);
  }

  ionViewWillEnter() {
  }

  help() {
    this.showAlert('帮助', '1. 上拉回到上一章<br>2. 下拉去下一章');
  }

  toggleFooter() {
    this.show = !this.show;
  }

  getContent(next, last) {
    this.showLoading('正在加载中...');
    if (this.item == null || isUndefined(this.item)) {
      this.item = {};
      this.item['id'] = 0;
    }
    // 获取当章内容
    let url = this.service.api.novel_chapter_read;
    this.service.http.get(url, {
      params: {
        read_id: this.item['id'],
        novel_id: this.item['novel'],
        next: next,
        last: last
      }
    }).subscribe(
      result => {
        this.hideLoading();
        this.data = result;
        this.item = result;
        this.scrollToTop();
      },
      error => {
        this.hideLoading();
        this.showAlert('警告', '加载出错，请重试');
        this.navCtrl.pop();
      }
    );
  }

  showChapters() {
    let callback = (_params) => {
      return new Promise((resolve, reject) => {
        this.item = _params;
        console.log(this.item);
        this.getContent(false, false);
        resolve();
      });
    };
    this.navCtrl.push('NovelChaptersPage', {'read': this.item, 'callback': callback});
  }


  @ViewChild(Content) content: Content;

  /**
   * 返回顶部
   */
  scrollToTop() {
    this.content.scrollToTop();
  }
}
