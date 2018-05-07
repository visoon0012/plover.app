import {Base} from '../pages/base';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PloverAuthInterceptor} from '../services/plover.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PloverService} from '../services/plover.service';
import {Clipboard} from "@ionic-native/clipboard";
import {AppVersion} from '@ionic-native/app-version';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    Base,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: "ios-arrow-back",
      tabbarPlacement: 'bottom',
      swipeBackEnabled: true,
      backButtonText: '返回',
      iconMode: 'ios',
      mode: 'ios',
      pageTransition: 'android',
      tabsHideOnSubPages: true
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Base,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PloverService,
    Clipboard,
    AppVersion,
    InAppBrowser,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PloverAuthInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
  ]
})
export class AppModule {
}
