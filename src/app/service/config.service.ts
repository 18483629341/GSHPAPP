import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /** 基本配置  --start */
 // public host = 'http://192.168.1.173:8080/RestService/rest/'; // 接口服务地址
  public host = 'http://192.168.0.156:8020/RestService/rest/'; // 接口服务地址
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
  public approvalForm = 'ProjectStatistics/getJsxmhpspjcxxbOne'; // 获取建设项目环评审批基础信息表详情
  /**获取建设项目环评审批基础信息表详情 --end */

  /**三同时检查录入 --start */
  public checkSave = 'ProjectStatistics/getJsxmhpspjcxxb'; // 获取建设项目环评审批基础信息表详情
  /**三同时检查录入 --end */

  /**建设单位列表数据详情  --start */
  public ProInfo = 'HpjdManagerment/getDevcompanyDetailInfo'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**建设单位列表数据详情  --start */
  public RelateItemInfo = 'HpjdManagerment/getDevRelateItemInfo'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-编制单位-获取列表数据  --start */
  public HpjgInfoList = 'HpjdManagerment/getHpjgInfoList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-编制单位列表详情数据-机构数据  --start */
  public HpjgDetailInfo = 'HpjdManagerment/getHpjgDetailInfo'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-编制单位列表详情数据-工程师  --start */
  public EnginnerInfoList = 'HpjdManagerment/getHpjgEnginnerInfoList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-编制单位列表详情数据-项目  --start */
  public ItemInfoList = 'HpjdManagerment/getHpjgItemInfoList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-编制单位列表详情数据-诚信信息  --start */
  public CxInfoList = 'HpjdManagerment/getHpjgCxInfoList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-环评专家列表详情数据-领域列表  --start */
  public FieldList = 'HpjdManagerment/getExpertFieldList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-环评专家列表详情数据-学历  --start */
  public EducationList = 'HpjdManagerment/getExpertEducationList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-环评专家列表详情数据-列表  --start */
  public ExpertDataList = 'HpjdManagerment/getExpertDataList'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /**环评监督管理-环评专家列表详情数据-列表  --start */
  public ExpertBaseInfo = 'HpjdManagerment/getExpertBaseInfo'; // 获取建设项目环评审批基础信息表详情
  /**建设单位列表数据详情  --end */

  /** 环评监督管理-编制单位列表详情数据-工程师  --start */
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

 /***地图查询  筛选列表  start*/
 public mapAreaList='ProjectStatistics/getRegions';// 地图查询页面     获取筛选条件区域列表
 public mapIndustryList='HpjdManagerment/getIndustryList';//地图查询页面   获取筛选条件行业列表
 public mapYearList='ProjectStatistics/getYears';// 地图查询页面       获取筛选条件年份列表
 public mapHpFileList='ProjectStatistics/getHpxs';// 地图查询页面      获取筛选条件环评文件列表
  /***地图查询  筛选列表  end*/
  
  constructor() { }
}
