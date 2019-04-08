import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MapHttpService {

  constructor(public httpService: HttpService,public configService:ConfigService) {

  }
  /**
  * 获取地图的行政区的筛选条件的数据列表
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
  getMapAreaData(params, showloading, callback) {
    // return this.httpService.get('assets/data/mapAre.json', params, showloading, callback);
    return this.httpService.get(this.configService.host+this.configService.mapAreaList, params, showloading, callback);
  }
  /**
  * 获取地图的行业的筛选条件的数据列表
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
  getMapIndustryData(params, showloading, callback) {
    //return this.httpService.get('assets/data/mapIndustry.json', params, showloading, callback);
    return this.httpService.get(this.configService.host+this.configService.mapIndustryList, params, showloading, callback);
  }
  /**
  * 获取地图的年份的筛选条件的数据列表
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
  getMapYearData(params, showloading, callback) {
   // return this.httpService.get('assets/data/year.json', params, showloading, callback);
   return this.httpService.get(this.configService.host+this.configService.mapYearList, params, showloading, callback);
  }
   /**
  * 获取地图的环评文件的筛选条件的数据列表
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
 getEnviAssessmentData(params, showloading, callback) {
  //return this.httpService.get('assets/data/evin.json', params, showloading, callback);
  return this.httpService.get(this.configService.host+this.configService.mapHpFileList, params, showloading, callback);
 }
   /**
  * 获取项目统计分析数据列表
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
 getProStatisticsData(params, showloading, callback) {
  return this.httpService.get('assets/data/charts.json', params, showloading, callback);
 }

  /**
  * 获取地图点位
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
 getMapPointData(params, showloading, callback) {
  return this.httpService.get('assets/data/mapPoint.json', params, showloading, callback);
 }

 /**
  * 获取项目列表数据
  * @param {Object} params 调用方法传过来的参数
  * @param {Boolean} showloading 是否显示数据加载,false或不传参为显示，true不显示
  * @param {Function} callback 回调函数
  */
 getMapListData(params, showloading, callback) {
  return this.httpService.get('assets/data/projectList.json', params, showloading, callback);
 }
}
