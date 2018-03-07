import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';

/**
 * Generated class for the UserLoginPage page.
 *
 * See httservice://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage extends Base {

  public loginData = {
    username: '',
    password: ''
  };

  /**
   * 登录
   */
  login() {
    this.showLoading('正在登陆中...');
    this.service.http.post(this.service.api.auth, this.loginData).subscribe(
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
