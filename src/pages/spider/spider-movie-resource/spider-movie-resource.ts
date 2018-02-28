import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Base } from '../../base';
import { PloverService } from '../../../services/plover.service';
import { Clipboard } from '@ionic-native/clipboard';


@IonicPage()
@Component({
  selector: 'page-spider-movie-resource',
  templateUrl: 'spider-movie-resource.html',
})
export class SpiderMovieResourcePage  extends Base {

  public movie: any = {
    'spiderItems': [],  // 爬虫列表
    'spiderItemSelect': {},  // 选的的爬虫项
    'detailItems': [],
  };

  oldItem = {
    title: '',
  }; // 旧Item，标识是否和最新取的一致
  timer = null; // 计时器

  constructor(public ps: PloverService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public clipboard: Clipboard,
    public modalCtrl: ModalController, ) {
    super(loadingCtrl, alertCtrl, toastCtrl, navCtrl, modalCtrl, clipboard);
  }

  ionViewDidEnter() {
    this.initSpiderItems();
  }

  initSpiderItems() {
    if (!localStorage['search_list']) {
      let data = [
        {
          name: '电影港',
          url: 'http://www.dygang.com'
        },
        {
          name: '6vhao',
          url: 'http://www.6vhao.com'
        },
        {
          name: 'dy2018',
          url: 'http://www.dy2018.com'
        },
        {
          name: 'btbtdy',
          url: 'http://www.btbtdy.com/',
        },
        {
          name: 'btbtdy 最新',
          url: 'http://www.btbtdy.com/new/',
        }
      ];
      localStorage['search_list'] = JSON.stringify(data);
    }
    // 获取
    this.movie.spiderItems = JSON.parse(localStorage['search_list']);
  }

  itemSelected(item) {
    this.movie.spiderItemSelect = item;
    this.processingMovieList();
  }

  processingMovieList() {
    // 获取列表页DOM
    let url = this.movie.spiderItemSelect['url'];
    this.ps.http.get(url, { responseType: 'text' }).subscribe((data) => {
      // 在python里面分析DOM数据
      this.ps.http.post(this.ps.api.processing_index, { dom: data, type: url }).subscribe((data) => {
        this.movie.detailItems = data;
      }, (error) => {
      });
    }, (error) => {

    });
  }

  processingMovieDetail(item: any) {
    if (item['href'].indexOf('btbtdy') != -1) {
      // 特殊处理
      let number = (item['href'].split('/')[4]).replace('dy', '');
      let url = 'http://www.btbtdy.com/vidlist/' + number + '?timestamp=0';
      this.ps.http.get(url, { responseType: 'text' }).subscribe(
        (data) => {
          this.ps.http.post(this.ps.api.processing_detail, {
            dom: data,
            type: this.movie.spiderItemSelect['url'],
            title: item['title']
          }).subscribe((data) => {
            this.deleteItem(item);
          }, (error) => {
          });
        },
        (error) => {
        }
      );
    } else if (item['href'].indexOf('dy2018') != -1 || item['href'].indexOf('dygang') != -1) {
      this.ps.http.post(this.ps.api.processing_detail, {
        dom: item['href'],
        type: this.movie.spiderItemSelect['url'],
        title: item['title']
      }).subscribe((data) => {
        this.deleteItem(item);
      }, (error) => {
      });
    } else {
      let url = item['href'];
      this.ps.http.get(url, { responseType: 'text' }).subscribe(
        (data) => {
          this.ps.http.post(this.ps.api.processing_detail, {
            dom: data,
            type: this.movie.spiderItemSelect['url'],
            title: item['title']
          }).subscribe((data) => {
            this.deleteItem(item);
          }, (error) => {
          });
        },
        (error) => {
        }
      );
    }
  }

  AutoStart() {
    this.timer = setInterval(() => {
      this.processingItem();
    }, 1 * 1000);
  }

  processingItem() {
    // 因为第一个会被删除，所以永远取第一个就好了
    let item = this.movie.detailItems[0];
    if (item) {
      if (this.oldItem['title'] != item['title']) {
        this.oldItem['title'] = item['title'];
        this.processingMovieDetail(item);
      } else {
        console.log('重复，不处理');
      }
    } else {
      if (this.timer != null) {
        clearInterval(this.timer);
      }
    }
  }

  deleteItem(item) {
    for (let i = 0; i < this.movie.detailItems.length; i++) {
      if (this.movie.detailItems[i]['href'] == item['href']) {
        this.movie.detailItems.splice(i, 1);
        break;
      }
    }
  }

  clearDetailItems() {
    this.movie.detailItems = [];
  }

  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

  // 上拉 加载
  doInfinite(ionInfinite) {
    setTimeout(() => {
      ionInfinite.complete();
    }, 3000);
  }
}