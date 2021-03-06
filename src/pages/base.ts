import {Component} from '@angular/core';
import {
  NavController,
  AlertController,
  ToastController,
  NavParams,
  ModalController,
  LoadingController, ViewController
} from 'ionic-angular';
import {Clipboard} from '@ionic-native/clipboard';
import {AppVersion} from '@ionic-native/app-version';
import {InAppBrowser} from '@ionic-native/in-app-browser';

import {PloverService} from "../services/plover.service";

@Component({
  selector: 'page-base',
  template: '<div>Loading...</div>',
})
export class Base {

  public loading = null;

  constructor(public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController,
              public clipboard: Clipboard,
              public appVersion: AppVersion,
              public iab: InAppBrowser,
              public service: PloverService) {
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  subResources(resources) {
    let source_list = [];
    // 查询分类
    for (let i in resources) {
      let resource = resources[i];
      if (source_list.indexOf(resource['source']) == -1) {
        source_list.push(resource['source']);
      }
    }
    // 按照分类添加数据
    let items = [];
    for (let i in source_list) {
      let source = source_list[i];
      let data = [];
      for (let j in resources) {
        let resource = resources[j];
        if (source == resource['source']) {
          data.push(resource);
        }
      }
      items.push(data);
    }
    return items;
  }

  checkUpdate() {
    this.service.http.get('http://www.plover.cloud/version.json', {}).subscribe(
      data => {
        this.appVersion.getVersionCode().then(version => {
          if (Number(version) < Number(data['VersionCode'])) {
            let prompt = this.alertCtrl.create({
              title: '有新的版本更新',
              message: `更新内容: ${data['message']}`,
              buttons: [
                {
                  text: '确定',
                  handler: message => {
                    const browser = this.iab.create(data['url'], '_system');
                    browser.close();
                  }
                }
              ]
            });
            prompt.present();
          } else {
            // this.presentToast('您已经是最新版本了，不需要进行更新');
          }
        }).catch(() => {
          console.log('不在cordova环境中');
        });
      },
      error => {
      }
    );
  }

  copy(str) {
    // 浏览器复制功能
    // let selBox = document.createElement('textarea');
    // selBox.style.position = 'fixed';
    // selBox.style.left = '0';
    // selBox.style.top = '0';
    // selBox.style.opacity = '0';
    // selBox.value = val;
    // document.body.appendChild(selBox);
    // selBox.focus();
    // selBox.select();
    // document.execCommand('copy');
    // document.body.removeChild(selBox);
    // this.presentToast('已复制到粘贴板');
    // 调用原生的复制功能
    this.clipboard.copy(str).then(data => {
      this.presentToast('复制成功');
    }).catch(error => {
      this.presentToast('复制失败，您的浏览器可能不支持该功能，请手动复制');
      let prompt = this.alertCtrl.create({
        title: '请手动复制',
        message: '请手动复制下面输入框内容',
        inputs: [
          {
            name: 'str',
            value: str
          },
        ],
        buttons: [
          {
            text: '确定',
            handler: data => {
            }
          }
        ]
      });
      prompt.present();
    });
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
      duration: 30000
    });
    this.loading.present();
  }

  hideLoading() {
    if (this.loading != null) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  presentToast(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "关闭",
    });
    toast.present();
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['确认']
    });
    alert.present();
  }

  handleError(error: any) {
    if (error.status == 400) {
      this.showAlert('提示', JSON.stringify(error.error));
    } else if (error.status == 401) {
      this.presentToast('请先登录');
      let modal = this.modalCtrl.create('UserLoginPage');
      modal.onDidDismiss(data => {
      });
      modal.present();
    } else if (error.status == 403) {
      this.presentToast('您没有执行该操作的权限');
    } else {
      this.showAlert('警告', '无法确认的错误，请检查网络');
    }
  }
}
