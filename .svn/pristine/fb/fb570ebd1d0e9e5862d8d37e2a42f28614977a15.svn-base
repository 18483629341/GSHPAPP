import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectFilesService {

  constructor(public httpService: HttpService) { }
  // 基本信息
  getBaseInfoData(params, showloading, callback) {
    return this.httpService.get('assets/data/baseInfo.json', params, showloading, callback);
   }
   // 登录表
   getLoginTable(params, showloading, callback) {
    return this.httpService.get('../../assets/data/loginTable.json', params, showloading, callback);
   }
    // 项目档案
    getProjectInfo(params, showloading, callback) {
      return this.httpService.get('../../assets/data/projectInfo.json', params, showloading, callback);
     }
}
