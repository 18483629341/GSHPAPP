import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.page.html',
  styleUrls: ['./personal-center.page.scss'],
})
export class PersonalCenterPage implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }
  // 跳转收藏
  goFavorite() {
    this.router.navigate(['favorite']);
  }
  quit() {
    this.presentAlertConfirm('确定退出登录');
  }
  async presentAlertConfirm(val) {
    const alert = await this.alertController.create({
      message: val,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            this.router.navigate(['login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
