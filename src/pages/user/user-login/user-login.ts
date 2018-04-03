import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';


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
        localStorage['token'] = 'JWT ' + data['token'];
        localStorage['user'] = JSON.stringify(data['user']);
        this.navCtrl.popAll();
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
