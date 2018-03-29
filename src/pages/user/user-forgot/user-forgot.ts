import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';


@IonicPage()
@Component({
  selector: 'page-user-forgot',
  templateUrl: 'user-forgot.html',
})
export class UserForgotPage extends Base {

  public forgotData = {
    username: '',
    password: '',
    email: ''
  };

  forgot() {
    if (this.forgotData.username == '') {
      this.presentToast('用户名不能为空');
      return;
    }
    if (this.forgotData.password == '') {
      this.presentToast('密码不能为空');
      return;
    }
    if (this.forgotData.email == '') {
      this.presentToast('邮箱不能为空');
      return;
    }
    this.showLoading('正在重置密码，请稍后...');
    let url = this.service.api.user_forgot;
    this.service.http.put(url, this.forgotData).subscribe(
      data => {
        this.hideLoading();
        this.presentToast('密码已重置，请用新密码登录');
        this.goLogin();
      },
      error => {
        this.hideLoading();
        this.handleError(error);
      });
  }

  goRegister() {
    this.navCtrl.push('UserRegisterPage');
  }

  goLogin() {
    this.navCtrl.push('UserLoginPage');
  }


}
