import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Base} from "../../base";


@IonicPage()
@Component({
  selector: 'page-system-ss-list',
  templateUrl: 'system-ss-list.html',
})
export class SystemSsListPage extends Base {
  my_servers: any = [];
  share_servers = [];

  ionViewDidEnter() {
    this.getMyServers();
    this.getShareServers();
  }

  getMyServers() {
    let url = this.service.api.system_ss_user_servers;
    this.service.http.get(url).subscribe(
      result => {
        this.my_servers = result;
      },
      error => {
        this.handleError(error);
      }
    );
  }

  getShareServers() {
    let url = this.service.api.system_ss;
    this.service.http.get(url).subscribe(
      result => {
        this.share_servers = result['results'];
      },
      error => {
        this.handleError(error);
      }
    );
  }

  copy_ss_link(item) {
    let link = `aes-256-cfb:${item.ss_pass}@${item.system_ip}:${item.ss_port}`;
    this.copy(`ss://${btoa(link)}#感谢_${item.user_obj.username}_的分享`);
  }
}
