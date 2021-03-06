import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProjectFilesService } from 'src/app/service/project-files.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  visibility: any = false;
  loginInfo = {
    userName: '', // 用户名
    password: '', // 密码
    isRemName: false, // 是否记住用户名
    isRemPwd: false // 是否记住密码
  };
  // 改变密码显示
  changeEyes() {
    this.visibility = !this.visibility;
  }
  // 清除用户
  clearInput() {
    this.loginInfo.userName = '';
  }

  constructor(
    public router: Router,
    public toastController: ToastController,
    private storage: Storage,
    public projectFilesService: ProjectFilesService
     ) {

  }
  // 提示框
  async presentToastWithOptions(msg) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'x',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    // console.log(localStorage.getItem('login'));
    // const info = JSON.parse(localStorage.getItem('login'));
    // if (info.isRemName) {
    //   this.loginInfo.userName = info.userName;
    //   this.loginInfo.isRemName = info.isRemName;
    // }
    // if (info.isRemPwd) {
    //   this.loginInfo.userName = info.userName;
    //   this.loginInfo.password = info.password;
    //   this.loginInfo.isRemPwd = info.isRemPwd;
    // }
    // 加载页面时载入存储的数据是否有记住密码和记住用户
    this.storage.get('user').then(data => {
      if (data !== null && data.isRemName) {
        this.loginInfo.userName = data.userName;
        this.loginInfo.isRemName = data.isRemName;
      }
      if (data !== null && data.isRemPwd) {
        this.loginInfo.password = data.password;
        this.loginInfo.isRemPwd = data.isRemPwd;
      }
    },
      error => console.log(error)
    );
  }
  /**
   * 登录点击事件
   */
  login() {
    // 判断用户不能为空
    if (this.loginInfo.userName.trim() === '') {
      this.presentToastWithOptions('用户名不能为空');
      return false;
    }
    if (this.loginInfo.password.trim() === '') {
      this.presentToastWithOptions('密码不能为空');
      return false;
    }
    // let data = {
    //   userName: this.loginInfo.userName,
    //   password: this.loginInfo.password,
    //   isRemName: this.loginInfo.isRemName,
    //   isRemPwd: this.loginInfo.isRemPwd
    // };

    // localStorage.setItem('login', JSON.stringify(data));

    // 存储用户数据到storage
    this.storage.set('user', {
      userName: this.loginInfo.userName,
      password: this.loginInfo.password,
      isRemName: this.loginInfo.isRemName,
      isRemPwd: this.loginInfo.isRemPwd,
    });
    this.projectFilesService.login({'loginName': this.loginInfo.userName, 'passWord': this.loginInfo.password}, true, res => {
      console.log(res);
      if (res !== 'error') {
        if (res.ret === '1') { // 登录成功
          this.router.navigateByUrl('/app/tabs/tab1');
        } else {
          this.presentToastWithOptions(res.msg);
        }
      }
    });

  }
  // 记住用户
  isRememberName() {
    if (!this.loginInfo.isRemName) {// 取消记住用户名，同时操作取消记住密码
      this.loginInfo.isRemPwd = false;
    }
  }
  // 记住密码
  isRememberPwd() {
    if (this.loginInfo.isRemPwd) {// 记住密码同时记住用户名
      this.loginInfo.isRemName = true;
    }
  }


}
