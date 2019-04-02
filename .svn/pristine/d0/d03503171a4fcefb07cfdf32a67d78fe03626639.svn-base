import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapHttpService } from '../service/map-http.service'; // 引入接口方法
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public isShowOptions: boolean; // 筛选div是否显示
  public mapOptionAreaList: any = []; // 地图的tab筛选条件的区域列表
  public mapOptionIndustryList: any = []; // 地图的tab筛选条件的行业列表
  public mapOptionYearList: any = []; // 地图的tab筛选条件的年份列表
  public currentOptionTabIndex; // 当前点击的tab的index的值
  public isXingXing: any = false;
  item: any = '0';
  Area: any = '区域';
  constructor(private router: Router,
    public alertController: AlertController,
    public mapHttpService: MapHttpService,
    public toastController: ToastController
    ) {
      this.isShowOptions = false; // 默认不显示筛选列表数据
    this.getMapAreaData();
    this.getOptionIndustryListData();
    this.getOptionYearListData();

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: '修改成功',
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  // 点击星星收藏
  isCollection() {
    this.isXingXing = !this.isXingXing;
  }

  // 选中切换
  OnitemClick(num) {
    this.item = num;
    this.isShowOptions = false;
  }
  // 跳转至项目信息
  goProInfo() {
    this.router.navigate(['/pro-info']);
  }
  // 跳转至编制单位信息
  goEstbUintInfo() {
    this.router.navigate(['/estabunit-info']);
  }
  // 跳转至编制单位信息
  goHPZJInfo() {
    this.router.navigate(['/hpzj-info']);
  }
  jumpEnvironmentList() {
    this.router.navigate(['/project-files']);
  }
  // 跳转检查录入
  goSave() {
    this.router.navigate(['/check-save']);
  }
  //
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: '区域',
      inputs: [
        {
          name: this.mapOptionAreaList[0].name,
          type: 'radio',
          label: this.mapOptionAreaList[0].name,
          value: this.mapOptionAreaList[0].name,
          checked: true
        },
        {
          name: this.mapOptionAreaList[1].name,
          type: 'radio',
          label: this.mapOptionAreaList[1].name,
          value: this.mapOptionAreaList[1].name
        },
        {
          name: '111',
          type: 'radio',
          label: this.mapOptionAreaList[2].name,
          value: this.mapOptionAreaList[2].name
        },
        {
          name: 'radio4',
          type: 'radio',
          label: this.mapOptionAreaList[3].name,
          value: this.mapOptionAreaList[3].name
        },
        {
          name: 'radio5',
          type: 'radio',
          label: this.mapOptionAreaList[4].name,
          value: this.mapOptionAreaList[4].name
        },
        {
          name: 'radio6',
          type: 'radio',
          label: this.mapOptionAreaList[5].name,
          value: this.mapOptionAreaList[5].name
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (value) => {
            console.log(value);
              if (value) {
              this.Area = value;
              this.presentToast();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * 获取地图的区域筛选条件列表
   */
  getMapAreaData() {
    this.mapHttpService.getMapAreaData({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.mapOptionAreaList = res.data || [];
      }
    });
  }

  /**
   * 获取地图的年份筛选条件列表
   */
  getOptionYearListData() {
    this.mapHttpService.getMapYearData({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.mapOptionYearList = res.data || [];
      }
    });
  }

  /**
   * 获取地图的环评文件筛选条件列表
   */
  getOptionIndustryListData() {
    this.mapHttpService.getMapIndustryData({}, true, res => {
      if (res !== 'error') {
        this.mapOptionIndustryList = res.data || [];
      }
    });
  }
  /**
   * 点击是否显示tab筛选条例列表数据
   */
  showOption(tabIndex) {
    if (!this.isShowOptions) { // 关闭状态下
      this.isShowOptions = !this.isShowOptions;
    } else { // 打开状态下 判断是否以然点击在tab上
      if (this.currentOptionTabIndex === tabIndex) { // 点击的同一个tab
        this.isShowOptions = !this.isShowOptions;
      }
    }
    this.currentOptionTabIndex = tabIndex;
  }
  /**
   * 关闭筛选条例列表数据window的点击事件
   */
  closePotionSelectWindow() {
    this.isShowOptions = !this.isShowOptions;
  }
  /**
   * 选择筛选选项(单选)
   */
  selectOption(item) {

  }
}
