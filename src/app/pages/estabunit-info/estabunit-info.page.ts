import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
@Component({
  selector: 'app-estabunit-info',
  templateUrl: './estabunit-info.page.html',
  styleUrls: ['./estabunit-info.page.scss'],
})
export class EstabunitInfoPage implements OnInit {
  str: any = '1';
  proChangeStr: any = '1';
  enterpriseCode: any; // 项目id
  /**
   * 接口对应字段
   */
  organizationName: any;
  organizationNature: any;
  organCertificateNumber: any;
  socialCreditCode: any;
  regionName: any;
  address: any;
  longitude: any;
  latitude: any;
  creatTime: any;
  legalPerson: any;
  validityTime: any;
  issuingTime: any;
  aReportRange: any;
  bReportRange: any;
  reportFormRange: any;
  organizationLevel: any;
  certificateNumber: any;
  contactPeople: any;

  /**工程师对应字段 */
  enginnerInfoList: any;


  /**项目对应字段 */
  projectA: any = [];
  projectB: any = [];
  projectC: any = [];
  /**诚信信息对应字段 */
  cxInfoList: any = [];

  constructor(private router: Router, public activatedRoute: ActivatedRoute, public projectFilesService: ProjectFilesService) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.enterpriseCode = params.enterpriseCode;
    });
  }

  ngOnInit() {
    this.getEstabunitInfo();
    this.getHpjgEnginnerInfoList();
    this.getHpjgCxInfoList();
  }
  // 获取编制单位工程师
  getHpjgEnginnerInfoList(): void {
    this.projectFilesService.getHpjgEnginnerInfoList({
      enterpriseCode: this.enterpriseCode,
      pageSize: 1,
      pageCount: 10
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.enginnerInfoList = res;
      }
    });
  }
  // 获取编制单位机构信息
  getEstabunitInfo(): void {
    this.projectFilesService.getEstabunitInfo({ enterpriseCode: this.enterpriseCode }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.organizationName = res.organizationName || '/';
        this.organizationNature = res.organizationNature || '/';
        this.organCertificateNumber = res.organCertificateNumber || '/';
        this.socialCreditCode = res.socialCreditCode || '/';
        this.regionName = res.regionName || '/';
        this.address = res.address || '/';
        this.longitude = res.longitude || '/';
        this.latitude = res.latitude || '/';
        this.creatTime = res.creatTime || '/';
        this.legalPerson = res.legalPerson || '/';
        this.validityTime = res.validityTime || '/';
        this.issuingTime = res.issuingTime || '/';
        this.aReportRange = res.aReportRange || '/';
        this.bReportRange = res.bReportRange || '/';
        this.reportFormRange = res.reportFormRange || '/';
        this.organizationLevel = res.organizationLevel || '/';
        this.certificateNumber = res.certificateNumber || '/';
        this.contactPeople = res.contactPeople || '/';
      }
    });
  }
  // 获取编制单位项目
  getHpjgItemInfoList(num): void {
    this.projectFilesService.getHpjgItemInfoList({
      enterpriseCode: this.enterpriseCode,
      dataType: num,
      pageSize: 1,
      pageCount: 10
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        switch (num) {
          case 0:
            this.projectA = res;
            break;
          case 1:
            this.projectB = res;
            break;
          case 2:
            this.projectC = res;
            break;
        }
      }
    });
  }
  // 获取编制单位诚信信息
  getHpjgCxInfoList(): void {
    this.projectFilesService.getHpjgCxInfoList({
      enterpriseCode: this.enterpriseCode,
      pageSize: 1,
      pageCount: 10
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.cxInfoList = res;
      }
    });
  }
  OnitemClick(num) {
    this.str = num;
    if (num == 3 && this.projectA.length == 0) {
      this.getHpjgItemInfoList(0);
    }
  }
  //  项目类型切换
  OnChangeProClick(num) {
    this.proChangeStr = num;
    switch (num) {
      case 1:
        // 请求省内项目 dataType=0
        if (this.projectA.length == 0) {

          this.getHpjgItemInfoList(0);
        }
        break;
      case 2:
        // 请求外省项目 dataType=1
        if (this.projectB.length == 0) {
          this.getHpjgItemInfoList(1);
        }
        break;
      case 3:
        // 请求为参与完成的建设项目环境影响评价项目 dataType=2
        if (this.projectC.length == 0) {
          this.getHpjgItemInfoList(2);
        }
        break;

    }
  }

  // 跳转至工程师
  goEngineer(item) {
    this.router.navigate(['engineer'], { queryParams: { engineer: JSON.stringify(item) } });
  }

  // 跳转至项目信息
  goProInfo(item) {
    this.router.navigate(['proinfo'], { queryParams: { ProInfo: JSON.stringify(item) } });
  }

  // 跳转至诚信信息
  goSincerityInfo(item) {
    console.log(item)
    this.router.navigate(['sincerity'], { queryParams: { sincerity: JSON.stringify(item) } });
  }

}
