import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";


@IonicPage()
@Component({
  selector: 'page-novel-search',
  templateUrl: 'novel-search.html',
})
export class NovelSearchPage extends Base {
  keywords = '';
  novel: any = {};
  novel_chapters = [];

  ionViewDidLoad() {
    let novel = this.navParams.data;
    if (novel['title']) {
      this.keywords = novel['title'];
      this.onSearch();
    }
  }

  onSearch() {
    this.showLoading('正在搜索中...');
    // 网上搜索
    let url = this.service.api.novel_search;
    this.service.http.get(url, {params: {keywords: this.keywords}}).subscribe(
      result => {
        this.hideLoading();
        this.novel = result['novel'];
        this.novel_chapters = result['novel_chapters'];
      },
      error => {
        this.hideLoading();
        this.handleError(error);
      }
    );
  }

  fork() {
    this.showLoading('正在标记中...');
    let url = this.service.api.novel_fork_fork.replace('${id}', this.novel['id']);
    this.service.http.get(url).subscribe(
      result => {
        this.hideLoading();
        this.presentToast(result['success']);
      },
      error => {
        this.hideLoading();
        this.handleError(error);
      }
    );
  }

  showChapters() {
  }
}
