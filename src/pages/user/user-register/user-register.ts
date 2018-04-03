import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';


@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage extends Base {

  public registerData = {
    username: '',
    password: '',
    password2: '',
    email: ''
  };

  /**
   * 注册
   */
  register() {
    if (this.registerData.username == '') {
      this.presentToast('用户名不能为空');
      return;
    }
    if (this.registerData.password == '') {
      this.presentToast('密码不能为空');
      return;
    }
    if (this.registerData.email == '') {
      this.presentToast('邮箱不能为空');
      return;
    }
    if (this.registerData.password != this.registerData.password2) {
      this.presentToast('两次密码不一致，请重新输入');
      return;
    }
    this.showLoading('正在注册，请稍后...');
    this.service.http.post(this.service.api.user, this.registerData).subscribe(
      data => {
        this.hideLoading();
        localStorage['token'] = 'JWT ' + data['token'];
        this.goLogin();
      },
      error => {
        this.hideLoading();
        this.presentToast(error._body);
      });
  }

  goLogin() {
    this.navCtrl.push('UserLoginPage');
  }

  goForgot() {
    this.navCtrl.push('UserForgotPage');
  }
}
