import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
  ) {
    this.initializeApp();
    // 记录登录状态下次不需要输入密码自动登录
    // storage.ready().then(() => {
    //   storage.get('user').then(
    //     (value: any) => {
    //       console.log(value)
    //       let isRemember = !!value ? value.isRemPwd : false;
    //       if ( isRemember ) {
    //         this.router.navigate(['login']);
    //       } else {
    //         this.router.navigate(['app/tabs/tab1']);
    //       }
    //     }
    //   );
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
