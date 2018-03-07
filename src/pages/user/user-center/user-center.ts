import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Base } from '../../base';
import { tokenNotExpired } from 'angular2-jwt';


@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage extends Base {

  user = {};

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

