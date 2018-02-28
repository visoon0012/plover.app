import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, Content } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { Base } from '../../base';
import { PloverService } from '../../../services/plover.service';

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage extends Base {

  douban_id = null;
  item: any = {
    'images': {},
    'rating': {}
  };
  resources: any = [];
  constructor(
    public navParams: NavParams,
    public ps: PloverService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public clipboard: Clipboard,
    public modalCtrl: ModalController, ) {
    super(loadingCtrl, alertCtrl, toastCtrl, navCtrl, modalCtrl, clipboard);
    this.douban_id = this.navParams.get('douban_id');
    this.getInfo();
  }

  getInfo() {
    let url = this.ps.api.movie + `1/?douban_id=${this.douban_id}`;
    this.ps.http.get(url).subscribe(
      (data) => {
        this.item = data;
        // 获取图片
        // this.ps.http.post(this.ps.api.movie_image, { url: this.item['images']['large'] }).subscribe(
        //   data => {
        //     this.item['images']['large'] = this.ps.plover_img + data['image_url'].substring(8);
        //   },
        //   error => {
        //   }
        // );
        // 获取资源
        url = this.ps.api.movie_resource_search + `?keywords=${data['title']}`;
        this.ps.http.get(url).subscribe(
          (data) => {
            this.resources = data;
          },
          (error) => {
          }
        );
      },
      (error) => {
      }
    );
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.getInfo();
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }
}
