import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MapHttpService } from 'src/app/service/map-http.service'; // 引入接口方法
import { ProjectFilesService } from '../service/project-files.service'; // 引入接口方法
import { loadModules } from 'esri-loader';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public isShowOptions: boolean; // 筛选div是否显示
  public area: string = '区域'; // 区域列表的头部
  public industry: string = '行业';  // 行业列表的头部
  public year: string = '年份';      // 年份列表的头部
  public envAssessment: string = '环评文件';      // 环评文件列表的头部
  public mapOptionAreaList: any = []; // 地图的tab筛选条件的区域列表
  public mapOptionIndustryList: any = []; // 地图的tab筛选条件的行业列表
  public mapOptionYearList: any = []; // 地图的tab筛选条件的年份列表
  public mapOptionHpfileList: any = []; // 地图的tab筛选条件的环评文件列表
  public currentOptionTabIndex; // 当前点击的tab的index的值
  public map: any; // 地图
  public isMapShow: boolean; // 是否显示地图
  public mapPoint: any = []; // 地图q全部的点位数据
  public povincPointLayer: any; // 省份大点图层
  public projectPointLayer: any; // 项目大点图层
  public mapProjectList: any = []; // 地图项目列表数据
  public showHidenFlag: boolean; // 地图上的筛选条件弹框（批复项目数量）
  public dataType; // 请求数据类型（批复项目类型）
  public projectInfoDate; // 项目详情信息
  public isShowProjectInfoData; // 地图是否显示详情信息弹框
  public areaTabIndex: any = 0; // 默认选中区域的下标
  public selectedIndustryArr: any = []; // 用于存放 暂时选中的行业名称
  public selectedIndustryIDs: any = []; // 用于存放 暂时选中的行业ID
  public yearTabIndex: any = 0; // 默认选中年份的下标
  public fileTabIndex: any = 0; // 默认选中环评文件的下标
  constructor(public mapHttpService: MapHttpService, public router: Router, public mapService: MapHttpService,
    public projectFilesService: ProjectFilesService) {
    this.isShowOptions = false; // 默认不显示筛选列表数据
    this.isMapShow = true; // 默认显示地图
    this.showHidenFlag = false; // 地图上的筛选条件弹框（批复项目数量）默认不显示
    this.isShowProjectInfoData = false; // 地图是否显示详情信息弹框(默认不显示)
    this.dataType = 2; // 默认显示建设项目总数

  }
  ngOnInit(): void {
  }
  /**
   * 地图加载完成
   */
  loadMap(map) {
    console.log('地图加载完成');
    this.map = map;
    loadModules(['esri/geometry/Point', 'esri/layers/GraphicsLayer', 'esri/symbols/PictureMarkerSymbol',
      'esri/graphic', 'esri/InfoTemplate']).then(([Point, GraphicsLayer, PictureMarkerSymbol, Graphic, InfoTemplate]) => {

        this.povincPointLayer = new GraphicsLayer({ id: 'povincPoint' }); // 省级图层（大点）
        this.projectPointLayer = new GraphicsLayer({ id: 'projectPoint' }); // 项目图层（小点）
        this.map.addLayers([this.povincPointLayer, this.projectPointLayer]); // 地图添加图层

        this.initData(); // 加载数据

        // 地图的点击事件
        this.map.on('click', (e) => {
          console.log(e);
          if (e.graphic) { // 判断点击的是不是点
            if (e.graphic.attributes && e.graphic.attributes.type === 'province') { // 是省级
              this.map.setZoom(6);
            }
            if (e.graphic.attributes && e.graphic.attributes.type === 'project') { // 是项目
              this.projectInfoDate = e.graphic.attributes;
              this.isShowProjectInfoData = true;
            }
          }
        });
        map.getLayer('projectPoint').hide(); // 小点隐藏
      });
    this.zoom(map);
  }

  // 地图缩放
  zoom(map) {
    map.on('zoom-end', (evt) => {
      console.log('home当前地图缩放级为' + evt.level);
      if (evt.level > 5) {
        // 小点
        map.getLayer('povincPoint').hide();
        map.getLayer('projectPoint').show();
      } else {
        // 大点
        map.getLayer('povincPoint').show();
        map.getLayer('projectPoint').hide();
      }
    });

  }

  /**
   * 一进地图就加载数据
   */
  initData() {
    this.getMapAreaData();
    this.getOptionIndustryListData();
    this.getOptionYearListData();
    this.getMapPointData();
    this.getOptionEnviAssessmentListData();
    // this.getMapListData();
  }

  /**
   * 获取地图的区域筛选条件列表
   */
  getMapAreaData() {
    this.mapHttpService.getMapAreaData({}, true, res => {
      // console.log('区域筛选列表',res);
      if (res !== 'error') {
        this.mapOptionAreaList = res || [];
      }
    });
  }

  /**
   * 获取地图的行业筛选条件列表
   */
  getOptionIndustryListData() {
    this.mapHttpService.getMapIndustryData({}, true, res => {
      console.log('行业筛选列表', res);
      if (res !== 'error') {
        this.mapOptionIndustryList = res || [];
      }
    });
  }

  /**
   * 获取地图的年份筛选条件列表
   */
  getOptionYearListData() {
    this.mapHttpService.getMapYearData({}, true, res => {
      // console.log('年份筛选列表',res);
      if (res !== 'error') {
        this.mapOptionYearList = res || [];
      }
    });
  }

  /**
   * 获取地图的环评文件筛选条件列表
   */
  getOptionEnviAssessmentListData() {
    this.mapOptionHpfileList=[{name:'全部'}];
    this.mapHttpService.getEnviAssessmentData({}, true, res => {
      console.log('环评文件筛选列表', res);
      if (res !== 'error') {
        res.map((item)=>{
          this.mapOptionHpfileList.push(item);
        })
      }
    });
  }


  /**
   * 获取地图的点位数据
   */
  getMapPointData() {
    this.mapHttpService.getMapPointData({}, true, res => {
      // console.log(res);
      if (res !== 'error') {
        this.mapPoint = res || [];
        this.mapPoint.forEach(item => {
          if (item.pointList) {
            item.pointList.forEach(element => {
              this.mapProjectList.push(element);
            });
          }
        });
        this.addProvincePoint(this.mapPoint, this.povincPointLayer); // 执行大点方法
        this.addProjectPoint(this.mapProjectList, this.projectPointLayer); // 执行小点方法
      }
    });
  }

  /**
   * 获取地图列表数据
   */
  // getMapListData() {
  //   this.mapHttpService.getMapListData({}, true, res => {
  //     // console.log(res);
  //     if (res !== 'error') {
  //       this.mapListPoint = res || [];
  //     }
  //   });  
  // }
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
   * 选择 主题为区域 筛选选项(单选)
   */
  selectAreaOption(item, i) {
    this.isShowOptions = !this.isShowOptions;
    this.areaTabIndex = i;
    this.area = item.regionName;
  }

  /**
   * 确认行业的筛选-多选
  */
  confirmIndustryOptions() {

    this.mapOptionIndustryList.map((item) => {
      if (item.isChecked === true) { // 当isChecked属性为true时
        if (this.selectedIndustryArr.indexOf(item.industryName) === -1) {//当数组(存放行业名称的)中不存在此行业名称时，才push
          this.selectedIndustryArr.push(item.industryName);//加入行业名称到数组中
          this.selectedIndustryIDs.push(item.industryCode);
        }
      } else {//当isChecked属性为false时
        if (this.selectedIndustryArr.indexOf(item.industryName) > -1) {//当数组(存放行业名称的)中存在此行业名称时，删除此名称
          var index = this.selectedIndustryArr.indexOf(item.industryName);
          this.selectedIndustryArr.splice(index, 1); //删除此行业名称
          this.selectedIndustryIDs.splice(index, 1);
        }
      }
    })
    var n = this.selectedIndustryArr.length;
    //当选择好后的行业数量n>1时，industry为“多选”,n===1时，industry为数组的第一项；,n=0时，industry为"行业
    this.industry = n > 1 ? '多选' : n === 1 ? this.selectedIndustryArr[0] : "行业";
    this.isShowOptions = !this.isShowOptions;
  }

  /**
   * 重置行业的筛选-多选
  */
  resetIndustryOptions() {
    this.mapOptionIndustryList.map(function (item) {
      if (item.isChecked === true) {
        item.isChecked = false;
      }
    })
    this.selectedIndustryArr = [];
  }
  /**
   * 选择 主题为年份的 筛选选项(单选)
  */
  selectYearOption(item, i) {
    this.isShowOptions = !this.isShowOptions;
    this.yearTabIndex = i;
    this.year = item.year;

  }

  /**
   * 选择 主题为环评文件的 筛选选项(单选)
  */
  selectFileOption(item, i) {
    this.isShowOptions = !this.isShowOptions;
    this.fileTabIndex = i;
    this.envAssessment = item.name;
  }

  /**
   * 点击切换地图和图表的显示方式
   */
  change() {
    this.isMapShow = !this.isMapShow;
  }

  goProInfo() {
    this.router.navigate(['project-files']);
  }
  goPersonal() {
    this.router.navigate(['personal-center']);
  }

  isCollection(item, index) {
    console.log(item);
    if (item.isCollection === '0') { // 没有收藏
      item.isCollection = '1';
    } else {
      item.isCollection = '0';
    }
  }

  /**
   * 点击切换打开关闭地图上的筛选条件（批复文件数量）
   */
  showHiden() {
    this.showHidenFlag = !this.showHidenFlag;
  }
  /**
  * 点击地图上的筛选条件（批复文件数量）
  */
  typeMap(dataType) {
    this.dataType = dataType;
  }
  legendCount() {

  }

  /**
  * 地图打点(省级，大点)
  * @param data 点位数据
  * @param graphicsLayer 待添加的点所在的图层
  * @param polluCode 污染物编码
  */
  addProvincePoint(data, graphicsLayer) {
    loadModules(['esri/geometry/Point', 'esri/layers/GraphicsLayer', 'esri/symbols/PictureMarkerSymbol',
      'esri/graphic', 'esri/InfoTemplate', 'esri/symbols/TextSymbol'])
      .then(([Point, GraphicsLayer, PictureMarkerSymbol, Graphic, InfoTemplate, TextSymbol]) => {
        data.forEach((item, index) => {
          // console.log(item);
          // 以下是打点操作
          const img = 'assets/imgs/provice.png';
          const width = 70;
          const height = 70;
          const pictureMarkerSymbol = new PictureMarkerSymbol(img, width, height);
          const point = new Point(item.regionLon, item.regionLat);
          // const point = new Point(114.08594, 22.547);
          const attrTemplate = {
            'type': 'province',
            'regionName': item.regionName,
            'regionCode': item.regionCode,
            'length': item.length
          };
          // 创建Graphic
          const graphicPic = new Graphic(point, pictureMarkerSymbol, attrTemplate);

          // 图层增加图片点
          graphicsLayer.add(graphicPic);

          let nameTextSymbol;
          nameTextSymbol = new TextSymbol(item.regionName || '--', 'white');
          const nameGraphicText = new Graphic(point, nameTextSymbol);

          let numberTextSymbol;
          numberTextSymbol = new TextSymbol(item.length || '--', 'white');
          const numberGraphicText = new Graphic(point, numberTextSymbol);
          numberTextSymbol.setOffset(0, -15);
          // 增加文字描述点
          graphicsLayer.add(nameGraphicText);
          graphicsLayer.add(numberGraphicText);

        });

      });

  }

  /**
  * 地图打点（市级，小点）
  * @param data 点位数据
  * @param graphicsLayer 待添加的点所在的图层
  * @param polluCode 污染物编码
  */
  addProjectPoint(data, graphicsLayer) {
    loadModules(['esri/geometry/Point', 'esri/layers/GraphicsLayer', 'esri/symbols/PictureMarkerSymbol',
      'esri/graphic', 'esri/InfoTemplate', 'esri/symbols/TextSymbol'])
      .then(([Point, GraphicsLayer, PictureMarkerSymbol, Graphic, InfoTemplate, TextSymbol]) => {
        data.forEach((element, index) => {
          // item.pointList.forEach(element => {
          console.log(element);
          let img;
          const width = 30;
          const height = 30;
          // 以下是打点操作
          if (this.dataType === 0) { // 在审项目
            img = 'assets/imgs/fs.png';
          }
          if (this.dataType === 1) { // 已批复项目
            img = 'assets/imgs/all.png';
          }
          if (this.dataType === 2) { // 建设项目
            img = 'assets/imgs/fq.png';
          }
          const pictureMarkerSymbol = new PictureMarkerSymbol(img, width, height);
          const point = new Point(element.lon, element.lat);
          // const point = new Point(114.08594, 22.547);
          const attrTemplate = {
            'type': 'project',
            'regionName': element.projectName,
            'regionCode': element.projectCode,
            'isCollection': element.isCollection
          };
          // 创建Graphic
          const graphicPic = new Graphic(point, pictureMarkerSymbol, attrTemplate);
          // 图层增加图片点
          graphicsLayer.add(graphicPic);
        });
        // });

      });

  }

}
