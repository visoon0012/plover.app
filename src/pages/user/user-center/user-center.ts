import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { PloverService } from '../../../services/plover.service';
import { Clipboard } from '@ionic-native/clipboard';
import { Base } from '../../base';
import { tokenNotExpired } from 'angular2-jwt';


@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage extends Base {

  user = {};

  constructor(
    public ps: PloverService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public clipboard: Clipboard,
    public modalCtrl: ModalController, ) {
    super(loadingCtrl, alertCtrl, toastCtrl, navCtrl, modalCtrl, clipboard);
  }

  ionViewDidLoad() {
    this.checkAuth();
  }

  checkAuth() {
    if (!tokenNotExpired()) {
      // 如果没有token，去登录
      let modal = this.modalCtrl.create('UserLoginPage');
      modal.onDidDismiss(data => {
        this.checkAuth();
      });
      modal.present();
    } else {
      this.user = JSON.parse(localStorage['user']);
    }
  }

  goSpiderDouban() {
    this.navCtrl.push('SpiderDoubanPage');
  }

  goSpiderMovieResource() {
    this.navCtrl.push('SpiderMovieResourcePage');
  }

  logout() {
    localStorage.clear();
    this.checkAuth();
  }

}

