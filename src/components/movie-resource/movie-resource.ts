import { Component, Input } from '@angular/core';
import {
  NavController,
  AlertController,
  ToastController,
  NavParams,
  ModalController,
  LoadingController
} from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { Base } from '../../pages/base';

@Component({
  selector: 'movie-resource',
  templateUrl: 'movie-resource.html'
})
export class MovieResourceComponent {

  @Input() resource: any;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public clipboard: Clipboard,
  ) {
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

  presentToast(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000
    });
    toast.present();
  }

}
