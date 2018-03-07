import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  ToastController,
  NavParams,
  ModalController,
  LoadingController
} from 'ionic-angular';
import {Clipboard} from '@ionic-native/clipboard';
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
              public clipboard: Clipboard,
              public service: PloverService) {
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  copy(str) {
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
      duration: 3000
    });
    this.loading.present();
  }

  hideLoading() {
    if (this.loading != null) {
      this.loading.dismiss();
    }
  }

  presentToast(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000
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
    } else {
      this.showAlert('警告', '无法确认的错误，请检查网络');
    }
  }
}
