import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage} from 'ionic-angular';
import {Base} from "../../base";

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
  chapters: any = [];
  current_chapter_site;

  style = {
    fontSize: 18,
    lineHeight: 36,
  };

  ionViewDidLoad() {
    this.item = this.navParams.data;
    this.getContent();
    this.getChapters();
  }

  help() {
    this.showAlert('帮助', '1. 上拉回到上一章<br>2. 下拉去下一章');
  }

  toggleFooter() {
    this.show = !this.show;
  }

  /**
   * 获取章节目录
   */
  getChapters() {
    let url = this.service.api.novel_chapter_chapters.replace('${id}', this.item['novel']['id']);
    this.service.http.get(url).subscribe(
      result => {
        this.chapters = result;
        this.getCurrentChapterSite();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  showChapters() {
    this.page = 'chapters';
  }

  /**
   * 获取当前章节所在章节列表的位置
   */
  getCurrentChapterSite() {
    let read_id = this.item['read']['id'];
    for (let i in this.chapters) {
      let chapter = this.chapters[i];
      if (chapter['id'] == read_id) {
        this.current_chapter_site = parseInt(i);
        break;
      }
    }
  }

  /**
   * 获取上一章内容
   */
  getContentLast() {
    if (this.current_chapter_site <= 0) {
      this.presentToast('已经是第一章');
      return;
    }
    this.current_chapter_site -= 1;
    this.item['read'] = this.chapters[this.current_chapter_site];
    this.getContent();
  }

  /**
   * 获取下一章内容
   */
  getContentNext() {
    if (this.current_chapter_site >= this.chapters.length) {
      this.presentToast('已经是最后一章');
      return;
    }
    this.current_chapter_site += 1;
    this.item['read'] = this.chapters[this.current_chapter_site];
    this.getContent();
  }

  /**
   * 获取当前选择章
   */
  getContentCurrent(item) {
    this.item['read'] = item;
    this.getContent();
    this.page = 'content';
  }

  getContent() {
    this.showLoading('正在加载中...');
    // 如果没读过，写第0章
    if (!this.item['read']) {
      this.item['read'] = 0;
    }
    // 获取当章内容
    let url = this.service.api.novel_chapter_read;
    this.service.http.get(url, {
      params: {
        read_id: this.item['read']['id'],
        novel_id: this.item['novel']['id']
      }
    }).subscribe(
      result => {
        this.hideLoading();
        this.data = result;
        this.scrollToTop();
      },
      error => {
        this.hideLoading();
        this.handleError(error);
      }
    );
  }


  @ViewChild(Content) content: Content;

  /**
   * 返回顶部
   */
  scrollToTop() {
    this.content.scrollToTop();
  }
}
