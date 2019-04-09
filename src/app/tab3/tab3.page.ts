import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { stringify } from '@angular/core/src/render3/util';
import { MapHttpService } from 'src/app/service/map-http.service'; // 引入接口方法
import { ProjectFilesService } from '../service/project-files.service'; // 引入接口方法

// import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(public mapHttpService: MapHttpService, public projectFilesService: ProjectFilesService) {
    this.isShowOptions = false; // 默认不显示筛选列表数据
    this.getProAnalysisRegionList();
    // this.getProAnalysisYearList();
    // this.getProAnalysisHpfileList();
  }

  public isShowOptions: boolean; // 筛选div是否显示
  public mapOptionAreaList: any = []; // 地图的tab筛选条件的区域列表
  public mapOptionYearList: any = []; // 地图的tab筛选条件的年份列表
  public mapOptionIndustryList: any = []; // 地图的tab筛选条件的行业列表
  public currentOptionTabIndex; // 当前点击的tab的index的值
  public screenWidth: number; // 获取屏幕宽度
  public title_text: String; // echarts图标标题
  public echartsAreaList: any = []; // 项目统计分析列表
  public echartsAreaNameList: any = []; // 图表和列表行政区列表
  public echartsAreaDataList: any = []; // 图表和列表数据列表
  public proAnalysisRegionList: any = []; // 项目统计分析-筛选条件-区域列表数据
  public proAnalysisYearList: any = []; // 项目统计分析-筛选条件-区域列表数据
  public proAnalysisHpfileList: any = []; // 项目统计分析-筛选条件-环评文件列表数据
  public i: number; // 遍历统计分析列表条件
  public religion: any;
  public religionCode: any;
  public documentCode: any = '';
  public year: any;
  public dataType: any = '0';
  public chart: any = 'chart1';
  public hpfile: any = '环评文件';
  public hpfile2: any = '';
  public active: any = 0;
  public active2: any = 0;
  public active3: any;
  public active4: any = 0;
  public dataIsExist: any = true;
  public dataSum: any = 0;
  str: any = '1';
  ngOnInit(): void {
  }
  /**
   * 获取项目统计分析列表，并分别提取行政区列表和数据列表
   */
  getProStatisticsData() {
    this.projectFilesService.getproAnalysisCountList({
      regionCode: this.religionCode, year: this.year,
      documentCode: this.documentCode, dataType: this.dataType
    },
      true, res => {
        console.log(res);
        if (res !== 'error' && res !== [null]) {
          this.echartsAreaList = res || [];
          this.echartsAreaNameList = [];
          this.echartsAreaDataList = [];
          for (let i = 0; i < this.echartsAreaList.length; i++) {
            this.echartsAreaNameList[i] = this.echartsAreaList[i].NAME;
            this.echartsAreaDataList[i] = this.echartsAreaList[i].DATA;
          }
          for (let i = 0; i < this.echartsAreaDataList.length; i++) {
            // tslint:disable-next-line:radix
            this.dataSum += parseInt(this.echartsAreaDataList[i]);
          }
          if (this.dataSum === 0) {
            this.dataIsExist = false;
          } else {
            this.dataIsExist = true;
            this.getEcharts(this.chart);
            this.screenWidth = window.innerWidth;
            this.dataSum = 0;
          }
        }
      });
  }

  /**
   * 获取项目统计分析-筛选条件-区域列表数据
   */
  getProAnalysisRegionList() {
    this.projectFilesService.getProAnalysisRegionList({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.proAnalysisRegionList = res || [];
        this.religion = res[0].regionName;
        this.getProAnalysisYearList();
        this.religionCode = this.proAnalysisRegionList[0].regionCode;
      }
    });
  }

  /**
   * 获取项目统计分析-筛选条件-年份列表数据
   */
  getProAnalysisYearList() {
    this.projectFilesService.getProAnalysisYearList({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.proAnalysisYearList = res || [];
        this.year = res[0].year;
        this.getProAnalysisHpfileList();
      }
    });
  }

  /**
   * 获取项目统计分析-筛选条件-环评文件列表数据
   */
  getProAnalysisHpfileList() {
    this.projectFilesService.getProAnalysisHpfileList({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.proAnalysisHpfileList = res || [];
        this.getProStatisticsData();
      }
    });
  }
  /**
   * 渲染echarts图表
   * @param charts 【需要渲染的echarts的id】
   */
  getEcharts(charts: string) {
    const ec = echarts as any;
    const container = document.getElementById(charts);
    const chart = ec.init(container);

    chart.setOption({
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (params) => {
          return params[0].axisValue + '：' + params[0].value;
        },
      },
      dataZoom: [{
        type: 'slider',
        show: true,
        realtime: true, // 拖动时，是否实时更新系列的视图
        height: 16,
        bottom: '10',
        left: '20%',
        right: '20%',
        start: 0,
        end: 100,
        textStyle: { color: '#181818' }
      },
      {
        type: 'inside',
      }
      ],
      grid: {
        left: '5%',
        right: '5%',
        bottom: '14%',
        top: '14%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.echartsAreaNameList,
        axisLabel: {
          interval: 0,
          rotate: 35
        },
        axisTick: {
          lineStyle: {
            color: '#fff'
          },
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#181818'
          }
        }
      },
      yAxis: {
        show: true,
        min: 0,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#181818'
          }
        }
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          barWidth: '10',
          data: this.echartsAreaDataList,
          itemStyle: {
            normal: {
              color: '#4162fb',
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        }
      ]
    });


  }
  /**
   * 头部按钮点击切换页面时间
   * @param num 【页面按钮传过来的标志条件】
   */
  OnitemClick(num) {
    this.str = num;
    if (num === 1) {
      this.chart = 'chart1';
      this.dataType = '0';
      this.dataIsExist = true;
    } else if (num === 2) {
      this.chart = 'chart2';
      this.dataType = '1';
      this.dataIsExist = true;
    } else if (num === 3) {
      this.chart = 'chart3';
      this.dataType = '2';
      this.dataIsExist = true;
    }
    this.getProStatisticsData();
    // this.getEcharts('chart' + num);
    this.isShowOptions = false;
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
   * 选择筛选区域选项(单选)
   */
  selectReligion(item, j) {
    console.log(item.regionCode);
    this.religion = item.regionName;
    this.religionCode = item.regionCode;
    console.log(this.religionCode);
    this.dataIsExist = true;
    this.getProStatisticsData();
    this.isShowOptions = false;
    this.active = j;
  }
  /**
   * 选择筛选年份选项(单选)
   */
  selectYear(item, j) {
    this.year = item.year;
    this.dataIsExist = true;
    this.getProStatisticsData();
    this.isShowOptions = false;
    this.active2 = j;
  }
  /**
   * 选择筛选环评文件选项(单选)
   */
  selectHpfile(item, j) {
    this.hpfile = item.enviAssessmentTypeName;
    this.hpfile2 = this.hpfile;
    this.documentCode = item.enviAssessmentTypeCode;
    this.dataIsExist = true;
    this.getProStatisticsData();
    this.isShowOptions = false;
    this.active3 = j;
    this.active4 = 0;
  }

  selectHpfileAll() {
    this.hpfile = '全部';
    this.hpfile2 = '';
    this.documentCode = '';
    this.dataIsExist = true;
    this.getProStatisticsData();
    this.isShowOptions = false;
    this.active4 = 1;
    this.active3 = -1;
  }
}


