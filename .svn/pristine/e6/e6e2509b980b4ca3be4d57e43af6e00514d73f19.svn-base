import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  visibility: any = false;
  userName: any = '';
  // 改变密码显示
  changeEyes() {
    this.visibility = !this.visibility;
  }
  // 清楚用户框
  clearInput() {
    this.userName = '';
  }

  constructor(public router: Router ) { }

  ngOnInit() {
  }
  /**
   * 登录点击事件
   */
  login() {
    // 登录成功跳转首页
    this.router.navigateByUrl('/app/tabs/tab1');
  }


}
