import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from '../../base';

/**
 * Generated class for the UserForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-forgot',
  templateUrl: 'user-forgot.html',
})
export class UserForgotPage extends Base {

  public forgotData = {
    phone: '',
    password: '',
    email: ''
  };

  forgot() {
    if (this.forgotData.phone == '') {
      this.presentToast('手机号不能为空');
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
    // this.ps.http.post(this.forgotData).subscribe(
    //   data => {
    //     this.hideLoading();
    //     this.showToast(data['message']);
    //     this.goLogin();
    //   },
    //   error => {
    //     this.hideLoading();
    //     this.showToast(error._body);
    //   });
  }

  goRegister() {
    this.navCtrl.push('UserRegisterPage');
  }

  goLogin() {
    this.navCtrl.push('UserLoginPage');
  }


}
