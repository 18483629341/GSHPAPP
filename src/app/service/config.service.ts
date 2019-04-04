import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /** 基本配置  --start */
  public host = 'http://192.168.1.173:8080/RestService/rest/'; // 接口服务地址
  /** 基本配置  --end */

  /**登录 --start */
  public login = 'HpjdManagerment/getLoginStatus'; // 登陆
  /**登录 --end */
  /**项目档案 --start */

  public projectFiles = 'ProjectStatistics/getProjectFiles'; // 项目档案首页
  /**项目档案 --end */

  /**建设项目基本情况 --start */
  public baseInfo = 'ProjectStatistics/getItemBasicInfo'; // 建设项目基本情况
  /**建设项目基本情况 --end */

  /**建设项目申请表 --start */
  public loginTable = 'ProjectStatistics/getJsxmhjbhsqb'; // 建设项目申请表
  /**建设项目申请表 --end */

  /**获取建设项目环评审批基础信息表详情 --start */
  public approvalForm = 'ProjectStatistics/getJsxmhpspjcxxb'; // 获取建设项目环评审批基础信息表详情
  /**获取建设项目环评审批基础信息表详情 --end */

  /**三同时检查录入 --start */
  public checkSave = 'ProjectStatistics/getJsxmhpspjcxxb'; // 获取建设项目环评审批基础信息表详情
  /**三同时检查录入 --end */
  /** 环评监督管理  --start */
  public regionList = 'HpjdManagerment/getAllRegion'; // 获取筛选条件区域列表
  public industryList = 'HpjdManagerment/getIndustryList'; // 获取删选条件行业列表
  public placeList = 'HpjdManagerment/getPlaceList'; // 获取删选条件地区列表
  public devcompanyInfoList = 'HpjdManagerment/getDevcompanyInfoList'; // 获取建设单位列表数据
  /** 环评监督管理  --end */


  /** 项目统计分析  --start */
  public proAnalysisRegionList = 'ProjectStatistics/getRegions'; // 获取筛选条件区域列表
  public proAnalysisYearList = 'ProjectStatistics/getYears'; // 获取筛选条件年份列表
  public proAnalysisHpfileList = 'ProjectStatistics/getHpxs'; // 获取筛选条件环评文件列表
  public proAnalysisCountList = 'ProjectStatistics/getCountList'; // 获取列表数据
  /** 项目统计分析  --end */


  constructor() { }
}
