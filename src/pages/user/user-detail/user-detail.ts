import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";


@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage extends Base {
  user: any = {};
  people: any = {};
  is_owner = true;

  ionViewDidEnter() {
    this.user = JSON.parse(localStorage['user']);
    this.people = this.navParams.data;
    if (this.people.id) {
      // 如果查看别人的信息
      this.user = this.people;
      this.is_owner = false;
    }
  }

  save_user() {
    let url = this.service.api.user + `${this.user['id']}/`;
    this.service.http.patch(url, this.user).subscribe(
      result => {
        this.user = result;
        localStorage['user'] = JSON.stringify(this.user);
        this.presentToast('个人信息更新成功');
      },
      error => {
        this.handleError(error);
      }
    );
  }
}
