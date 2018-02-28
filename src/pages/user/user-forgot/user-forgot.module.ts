import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserForgotPage } from './user-forgot';

@NgModule({
  declarations: [
    UserForgotPage,
  ],
  imports: [
    IonicPageModule.forChild(UserForgotPage),
  ],
})
export class UserForgotPageModule {}
