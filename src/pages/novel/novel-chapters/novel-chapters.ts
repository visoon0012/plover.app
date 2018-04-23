import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";

@IonicPage()
@Component({
  selector: 'page-novel-chapters',
  templateUrl: 'novel-chapters.html',
})
export class NovelChaptersPage extends Base {
  item = {};
  callback = null;
  chapters: any = [];

  ionViewWillEnter() {
    this.item = this.navParams.data['read'];
    this.callback = this.navParams.data['callback'];
    this.getChapters();
  }

  /**
   * 获取章节目录
   */
  getChapters() {
    this.showLoading('正在加载目录中...');
    let url = this.service.api.novel_chapter_chapters.replace('${id}', this.item['novel']);
    this.service.http.get(url).subscribe(
      result => {
        this.hideLoading();
        this.chapters = result;
      },
      error => {
        this.hideLoading();
        this.showAlert('警告','加载出错，请重试');
        this.navCtrl.pop();
      }
    );
  }

  selectChapter(chapter) {
    this.callback(chapter).then(() => {
      this.navCtrl.pop();
    });
  }
}
