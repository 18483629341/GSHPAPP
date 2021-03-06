import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-info',
  templateUrl: './pro-info.page.html',
  styleUrls: ['./pro-info.page.scss'],
})
export class ProInfoPage implements OnInit {
  /**建设单位信息 开始*/
  enterpriseName: any;
  socialCreditCode: any;
  address: any;
  creatTime: any;
  longitude: any;
  latitude: any;
  phone: any;
  fax: any;
  zipCode: any;
  email: any;
  legalPerson: any;
  environProtection: any;
  economicType: any;
  regionName: any;
  industryType: any;
  enterpriseCode: any;
  relativeList: any = [];
  /**建设单位信息  结束*/

  public relativeUnitArr = [
    { projectCode: 1, projectName: '兰州祁连山水泥商砼有限公司厂区扩建项目' },
    { projectCode: 2, projectName: '兰州祁连山水泥商砼有限公司厂区扩建项目' },
    { projectCode: 3, projectName: '兰州祁连山水泥商砼有限公司厂区扩建项目' },
    { projectCode: 4, projectName: '兰州祁连山水泥商砼有限公司厂区扩建项目' },
    { projectCode: 5, projectName: '兰州祁连山水泥商砼有限公司厂区扩建项目' },
  ];
  constructor(public activatedRoute: ActivatedRoute, public projectFilesService: ProjectFilesService, public router: Router ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      // 获取传过来的项目id
      this.enterpriseCode = params.enterpriseCode;
    });
  }


  ngOnInit() {
    this.getProInfo();
    this.getDevRelateItemInfo();
  }
  // 请求建设单位信息
  getProInfo(): void {
    this.projectFilesService.getProInfo({enterpriseCode: this.enterpriseCode}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.enterpriseName = res.enterpriseName || '/';
        this.socialCreditCode = res.socialCreditCode || '/';
        this.address = res.address || '/';
        this.creatTime = res.creatTime || '/';
        this.longitude = res.longitude || '/';
        this.latitude = res.latitude || '/';
        this.phone = res.phone || '/';
        this.fax = res.fax || '/';
        this.zipCode = res.zipCode || '/';
        this.email = res.email || '/';
        this.legalPerson = res.legalPerson || '/';
        this.environProtection = res.environProtection || '/';
        this.economicType = res.economicType || '/';
        this.regionName = res.regionName || '/';
        this.industryType = res.industryType || '/';
      }
    });
  }
  // 请求关联项目信息
  getDevRelateItemInfo() {
    this.projectFilesService.getDevRelateItemInfo({enterpriseCode: this.enterpriseCode}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.relativeList = res;
      }
    });
  }
  // 跳转关联项目详情
  goToRelated(item) {
    this.router.navigate(['pro-info-related'], { queryParams: { related: JSON.stringify(item) } });
  }
}
