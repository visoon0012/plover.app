import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Base } from '../../base';
import { PloverService } from '../../../services/plover.service';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the UserLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage  extends Base {

  public loginData = {
    username: '',
    password: ''
  };

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

  /**
   * 登录
   */
  login() {
    this.showLoading('正在登陆中...');
    this.ps.http.post(this.ps.api.auth, this.loginData).subscribe(
      data => {
        this.hideLoading();
        localStorage['token'] = data['token'];
        localStorage['user'] = JSON.stringify(data['user']);
        this.navCtrl.popTo('UserCenterPage');
      },
      error => {
        this.hideLoading();
        this.handleError(error);
      });
  }

  goRegister() {
    this.navCtrl.push('UserRegisterPage');
  }

  goForgot() {
    this.navCtrl.push('UserForgotPage');
  }
}
