import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";

@IonicPage()
@Component({
  selector: 'page-system-ss-detail',
  templateUrl: 'system-ss-detail.html',
})
export class SystemSsDetailPage extends Base {

  ss: any = {
    system_ip: '',
    system_name: 'root',
    system_pass: '',
    ss_port: 8388,
    ss_pass: 'plover.cloud',
    is_share: false
  };

  ionViewDidEnter() {
    if (this.navParams.data.id) {
      this.ss = this.navParams.data;
    }
    console.log(this.ss);
  }

  save_ss() {
    if (this.ss.system_ip == '') {
      this.presentToast('IP不能为空');
      return;
    }
    if (this.ss.system_name == '') {
      this.presentToast('服务器用户名不能为空');
      return;
    }
    if (this.ss.system_pass == '') {
      this.presentToast('服务器密码不能为空');
      return;
    }
    if (this.ss.ss_pass == '') {
      this.presentToast('SS密码不能为空');
      return;
    }
    let url = this.service.api.system_ss;
    this.service.http.post(url, this.ss).subscribe(
      result => {
        this.ss = result;
        this.showAlert('提示', '保存成功，如需配置请进行2');
      },
      error => {
        this.handleError(error);
      }
    );
  }

  config_ss() {
    if (this.ss.id) {
      this.showLoading('正在配置服务器，请稍后...');
      let url = this.service.api.system_ss_config.replace('${id}', this.ss.id);
      this.service.http.get(url).subscribe(
        result => {
          this.hideLoading();
          this.presentToast('配置完毕，服务器需要重启，请在30秒后启动SS');
        },
        error => {
          this.hideLoading();
          this.handleError(error);
        }
      );
    } else {
      this.presentToast('未能识别出您的服务器配置，请回到上一个页面重试');
    }
  }

  restart_ss() {
    if (this.ss.id) {
      this.showLoading('SS启动中，请稍后...');
      let url = this.service.api.system_ss_restart.replace('${id}', this.ss.id);
      this.service.http.get(url).subscribe(
        result => {
          this.hideLoading();
          this.presentToast('启动成功，请尽情使用吧！');
        },
        error => {
          this.hideLoading();
          this.handleError(error);
        }
      );
    } else {
      this.presentToast('未能识别出您的服务器配置，请回到上一个页面重试');
    }
  }

  share_ss() {
    this.ss.is_share = true;
    let url = this.service.api.system_ss + `${this.ss.id}/`;
    this.service.http.patch(url, this.ss).subscribe(
      result => {
        this.ss = result;
        this.showAlert('提示', '分享成功，您的SS将会出现在共享列表中！谢谢您的分享！');
      },
      error => {
        this.handleError(error);
      }
    );
  }

  delete_ss() {
    let confirm = this.alertCtrl.create({
      title: '确认删除？',
      message: '删除后，该服务器如果有分享也会一并删除',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            let url = this.service.api.system_ss + `${this.ss.id}/`;
            this.service.http.delete(url, this.ss).subscribe(
              result => {
                this.ss = result;
                this.presentToast('您已成功删除该SS，自动返回上一页');
                this.navCtrl.pop();
              },
              error => {
                this.handleError(error);
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

  copy_ss_link() {
    let item = this.ss;
    let link = `aes-256-cfb:${item.ss_pass}@${item.system_ip}:${item.ss_port}`;
    this.copy(`ss://${btoa(link)}#${item.system_ip}`);
  }
}
