import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.page.html',
  styleUrls: ['./base-info.page.scss'],
})
export class BaseInfoPage implements OnInit {
  // public baseInfoList: any = []; // 地图的tab筛选条件的区域列表
  public enviAssessmentTypeName: string;
  public applicantPeopleType: string;
  public permissionType: string;
  public projectName: string;
  public constructionUnit: string;
  public isCreditNumber: string;
  public organCertificateNumber: string;
  public constructionSite: string;
  public establishmentDepartment: string;
  public industryType: string;
  public enviAssessmentUnit: string;
  public enviAssessmentClass: string;
  public enviAssessmentEngineer: string;
  public projectAttribute: string;
  public constrctProjectClass: string;
  constructor(public projectFilesService: ProjectFilesService, public activatedRouted: ActivatedRoute) {
    this.getBaseInfoData();
  }

  ngOnInit() {
    this.activatedRouted.queryParams.subscribe(params => {
      console.log(params);
  });
  }
  getBaseInfoData(): void {
    this.projectFilesService.getBaseInfoData({projectCode: 1}, true, res => {
      if (res !== 'error') {
        // this.baseInfoList = res.data || [];
        this.enviAssessmentTypeName = res.enviAssessmentTypeName || '/';
        this.applicantPeopleType = res.applicantPeopleType || '/';
        this.permissionType = res.permissionType || '/';
        this.projectName = res.projectName || '/';
        this.constructionUnit = res.constructionUnit || '/';
        this.isCreditNumber = res.isCreditNumber || '/';
        this.organCertificateNumber = res.organCertificateNumber || '/';
        this.constructionSite = res.constructionSite || '/';
        this.establishmentDepartment = res.establishmentDepartment || '/';
        this.industryType = res.industryType || '/';
        this.enviAssessmentUnit = res.enviAssessmentUnit || '/';
        this.enviAssessmentClass = res.enviAssessmentClass || '/';
        this.enviAssessmentEngineer = res.enviAssessmentEngineer || '/';
        this.projectAttribute = res.projectAttribute || '/';
        this.constrctProjectClass = res.constrctProjectClass || '/';
      }
    });
  }

}
