import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SystemSsListPage } from './system-ss-list';

@NgModule({
  declarations: [
    SystemSsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SystemSsListPage),
  ],
})
export class SystemSsListPageModule {}
