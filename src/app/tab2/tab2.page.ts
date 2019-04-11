import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MapHttpService } from '../service/map-http.service'; // 引入接口方法
import { ProjectFilesService } from '../service/project-files.service'; // 引入接口方法
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public isShowOptions: boolean; // 筛选div是否显示
  public religionList: any = []; // 环评监督管理建设单位获取筛选条件区域列表
  public industryList: any = []; // 环评监督管理建设单位获取筛选条件区域列表
  public proInfoList: any = []; // 环评监督管理建设单位获取项目列表数据
  public placeList: any = []; // 环评监督管理编制单位获取项目地区列表数据
  public reportList: any = []; // 环评监督管理编制单位获取甲级环评报告书评价范围列表数据
  public unitList: any = []; // 环评监督管理编制单位获取单位列表数据
  public fieldList: any = []; // 环评监督管环评专家获取领域列表数据
  public educationList: any = []; // 环评监督管环评专家获取学历列表数据
  public mapOptionAreaList: any = []; // 地图的tab筛选条件的区域列表
  public mapOptionIndustryList: any = []; // 地图的tab筛选条件的行业列表
  public mapOptionYearList: any = []; // 地图的tab筛选条件的年份列表
  public currentOptionTabIndex; // 当前点击的tab的index的值
  public isXingXing: any = false;
  public HpzjList: any = []; // 环评专家列表
  public newArr: any = [];
  item: any = '0';
  Area: any = '区域';
  industry: any = '行业';
  location: any = '所在地';
  rangeName: any = '甲级环评报告书评价范围';
  fieldName: any = '领域';
  educationName: any = '学历';
  all: any;
  all2: any;
  active: any;
  active2: any;
  active3: any;
  active4: any;
  active5: any;
  active6: any;
  regionCode: any = '';
  industryCode: any = '';
  rangeCode: any = '';
  placeCode: any = '';
  educationCode: any = '';
  fieldCode: any = '';
  isData: any = false;
  isDataUnit: any = false;
  isDataExpert: any = false;
  constructor(private router: Router,
    public alertController: AlertController,
    public mapHttpService: MapHttpService,
    public toastController: ToastController,
    public projectFilesService: ProjectFilesService
  ) {
    this.isShowOptions = false; // 默认不显示筛选列表数据
    this.getReligionListData();
    this.getOptionIndustryListData();
    this.getIndustryListData();
    this.getProInfoListData();
    // this.getPlaceListData();
    // this.getReportListData();
    // this.getFieldListData();
    // this.getEducationListData();
    this.getHpzjList();
    this.projectFilesService.favoriteList = [];
  }

  // 点击星星收藏
  isCollection(item, index) {
    if (item.isCollection === '0') { // 没有收藏
      item.isCollection = '1';
      this.projectFilesService.favoriteList.push(item);
      this.newArr = this.projectFilesService.favoriteList;
      //  let  set = new Set(arr)
      // this.newArr=Array.from(set)
      console.log(this.newArr);

    } else {

      item.isCollection = '0';
      for (let i = 0; i < this.newArr.length; i++) {
        if (this.newArr[i].enterpriseId == item.enterpriseId) {
          this.newArr.splice(i, 1);
        }
      }
      console.log(this.newArr);
    }
    this.projectFilesService.favoriteList = this.newArr;
  }

  // 选中切换
  OnitemClick(num) {
    this.item = num;
    this.isShowOptions = false;
    switch (num) {
      case 1:
        if (this.placeList.length === 0) {
          this.getPlaceListData();
          this.getReportListData();
          this.getUnitListData();
        }
        break;
      case 2:
      if (this.fieldList.length === 0) {
        this.getFieldListData();
        this.getEducationListData();
      }
        break;
    }
  }
  // 跳转至项目信息
  goProInfo(item) {
    console.log(item);
    this.router.navigate(['/pro-info'], { queryParams: { enterpriseCode: item.enterpriseCode } });
  }
  // 跳转至编制单位信息
  goEstbUintInfo(item) {
    this.router.navigate(['/estabunit-info'], { queryParams: { enterpriseCode:  item.enterpriseCode  } });
  }
  // 跳转至编制单位信息
  goHPZJInfo(item) {
    this.router.navigate(['/hpzj-info'], { queryParams: { expertId:  item.expertId } });
  }
  jumpEnvironmentList() {
    this.router.navigate(['/project-files']);
  }
  // 跳转检查录入
  goSave() {
    this.router.navigate(['/check-save']);
  }
  //
  /**
   * 获取环评监督管理–建设单位-获取筛选条件-区域列表
   */
  getReligionListData() {
    this.projectFilesService.getReligionList({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.religionList = res || [];
      }
    });
  }

  /**
   * 获取环评监督管理–建设单位-获取筛选条件-行业列表
   */
  getIndustryListData() {
    this.projectFilesService.getIndustryList({}, false, res => {
      console.log(res);
      if (res !== 'error') {
        this.industryList = res || [];
      }
    });
  }
  getAllData(i) {
    this.projectFilesService.getProInfoList({
      pageSize: 1,
      pageCount: 10,
      loginName: 'admin',
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.proInfoList = res || [];
        this.Area = '全部';
        this.isData = false;
        this.all = i;
        this.active = null;
        this.isShowOptions = false;
      }
    });
  }
  getIndustryData(i) {
    this.projectFilesService.getUnitList({
      pageSize: 1,
      pageCount: 10,
      loginName: 'admin',
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.unitList = res || [];
        this.location = '全部';
        this.isDataUnit = false;
        this.all2 = i;
        this.active2 = null;
        this.isShowOptions = false;
      }
    });
  }
  /**
   * 获取环评监督管理–建设单位-获取列表数据
   */
  getProInfoListData() {
    this.projectFilesService.getProInfoList({
      pageSize: 1,
      pageCount: 10,
      loginName: 'admin',
      regionCode: this.regionCode,
      industryCode: this.industryCode
    },
      true, res => {
        console.log(res);
        if (res !== 'error') {
          this.proInfoList = res || [];
          if (res.length === 0) {
            this.isData = true;
          }
        }
      });
  }

  /**
   * 获取环评监督管理-编制单位-筛选条件-地区列表
   */
  getPlaceListData() {
    this.projectFilesService.getPlaceList({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.placeList = res || [];
      }
    });
  }
  /**
  * 获取环评监督管理-编制单位-筛选条件-甲级环评报告书评价范围列表
  */
  getReportListData() {
    this.projectFilesService.getReportList({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.reportList = res.data || [];
      }
    });
  }
  /**
   * 获取环评监督管理-编制单位-筛选条件-列表数据
   */
  getUnitListData() {
    this.projectFilesService.getUnitList({
      pageSize: 1,
      pageCount: 10,
      loginName: 'admin',
      placeCode: this.placeCode
      // rangeCode: this.rangeCode
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.unitList = res || [];
        if (res.length === 0) {
          this.isDataUnit = true;
        }
      }
    });
  }
  /**
    * 获取环评监督管理-环评专家-筛选条件-领域列表数据
    */
  getFieldListData() {
    this.projectFilesService.getFieldList({
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.fieldList = res || [];
      }
    });
  }
  /**
   * 获取环评监督管理-环评专家-筛选条件-学历列表数据
   */
  getEducationListData() {
    this.projectFilesService.getEducationList({}, false, res => {
      console.log(res);
      if (res !== 'error') {
        this.educationList = res || [];
      }
    });
  }
  // 请求环评专家数据
  getHpzjList() {
    this.projectFilesService.getHpzjList({
      pageSize: 1,
      pageCount: 10,
      loginName: 'admin',
      fieldCode: this.fieldCode,
      educationCode: this.educationCode
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.HpzjList = res || [];
        if (res.length === 0) {
          this.isDataExpert = true;
        }
      }
    });
  }

  /**
   * 获取地图的环评文件筛选条件列表
   */
  getOptionIndustryListData() {
    this.mapHttpService.getMapIndustryData({}, false, res => {
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
  selectArea(item, i) {
    this.Area = item.regionName;
    this.isShowOptions = false;
    this.active = i;
    this.all = '';
    this.regionCode = item.regionCode;
    this.getProInfoListData();
  }
  // 建设单位行业筛选
  selectIndustry(item, i) {
    this.industry = item.industryName;
    this.isShowOptions = false;
    this.active2 = i;
    this.industryCode = item.industryCode;
    this.getProInfoListData();
  }
  // 编制单位地区筛选
  selectLocation(item, i) {
    this.location = item.placeName;
    this.isShowOptions = false;
    this.active3 = i;
    this.placeCode = item.placeCode;
    this.getUnitListData();
  }
  // 编制单位报告筛选
  selectRangeName(item, i) {
    this.rangeName = item.rangeName;
    this.isShowOptions = false;
    this.active4 = i;
    this.rangeCode = item.rangeCode;
    this.getProInfoListData();
  }
  // 环评专家领域筛选
  selectFieldName(item, i) {
    this.fieldName = item.fieldName;
    this.isShowOptions = false;
    this.active5 = i;
    this.fieldCode = item.fieldCode;
    console.log(this.fieldCode);
    this.getHpzjList();
  }
  // 环评专家学历筛选
  selectEducationName(item, i) {
    this.educationName = item.educationName;
    this.isShowOptions = false;
    this.active6 = i;
    this.educationCode = item.educationCode;
    this.getHpzjList();
  }
  doRefresh(event) {
    console.log(event);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
