import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { Base } from '../../base';
import { PloverService } from '../../../services/plover.service';

@IonicPage()
@Component({
  selector: 'page-movie-search',
  templateUrl: 'movie-search.html',
})
export class MovieSearchPage extends Base {

  movie_list: any = [];
  resource_list: any = [];
  resource_new = {
    items: [],
    next: '',
  };
  bt_list: any = [];

  page = 'new';

  keywords = '';

  constructor(public ps: PloverService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public clipboard: Clipboard,
    public modalCtrl: ModalController, ) {
    super(loadingCtrl, alertCtrl, toastCtrl, navCtrl, modalCtrl, clipboard);
    this.getNew();
  }

  search(ev: any) {
    if (this.keywords == '') {
      return;
    }
    this.showLoading('正在加载中...');
    if (this.page == 'movie') {
      let url = this.ps.api.movie_search + `?keywords=${this.keywords}`;
      this.ps.http.get(url).subscribe(
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
      let url = this.ps.api.movie_resource_search + `?keywords=${this.keywords}`;
      this.ps.http.get(url).subscribe(
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
    else if (this.page == 'bt') { }
  }

  getNew() {
    let url = '';
    if (this.resource_new.next == '') {
      url = this.ps.api.movie_resource;
    }
    else {
      url = this.resource_new.next;
    }
    this.ps.http.get(url).subscribe(
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
