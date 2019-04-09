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

  constructor(private router: Router, public activatedRoute: ActivatedRoute, public projectFilesService: ProjectFilesService) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.enterpriseCode = params.enterpriseCode;
    });
  }

  ngOnInit() {
    this.getEstabunitInfo();
  }
  getEstabunitInfo(): void {
    this.projectFilesService.getEstabunitInfo({ enterpriseCode: this.enterpriseCode }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.organizationName = res.organizationName;
        this.organizationNature = res.organizationNature;
        this.organCertificateNumber = res.organCertificateNumber;
        this.socialCreditCode = res.socialCreditCode;
        this.regionName = res.regionName;
        this.address = res.address;
        this.longitude = res.longitude;
        this.latitude = res.latitude;
        this.creatTime = res.creatTime;
        this.legalPerson = res.legalPerson;
        this.validityTime = res.validityTime;
        this.issuingTime = res.issuingTime;
        this.aReportRange = res.aReportRange;
        this.bReportRange = res.bReportRange;
        this.reportFormRange = res.reportFormRange;
        this.organizationLevel = res.organizationLevel;
        this.certificateNumber = res.certificateNumber;
        this.contactPeople = res.contactPeople;
      }
    });
  }
  OnitemClick(num) {
    this.str = num;
  }

  // 跳转至工程师
  goEngineer() {
    this.router.navigate(['engineer']);
  }

  // 跳转至工程师
  goProInfo() {
    this.router.navigate(['proinfo']);
  }

  // 跳转至诚信信息
  goSincerityInfo() {
    this.router.navigate(['sincerity']);
  }
  OnChangeProClick(num) {
    this.proChangeStr = num;
  }
}
