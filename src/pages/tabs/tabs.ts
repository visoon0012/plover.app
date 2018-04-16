import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = 'MovieListPage';
  tab2Root = 'MessageListPage';
  tab3Root = 'UserCenterPage';
  tab4Root = 'NovelListPage';


  constructor(public navCtrl: NavController) {}

}
