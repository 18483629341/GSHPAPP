import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
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
  constructor(public projectFilesService: ProjectFilesService, ) {
    this.getBaseInfoData();
  }

  ngOnInit() {
  }
  getBaseInfoData(): void {
    this.projectFilesService.getBaseInfoData({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        // this.baseInfoList = res.data || [];
        this.enviAssessmentTypeName = res.data[0].enviAssessmentTypeName;
        this.applicantPeopleType = res.data[1].applicantPeopleType;
        this.permissionType = res.data[2].permissionType;
        this.projectName = res.data[3].projectName;
        this.constructionUnit = res.data[4].constructionUnit;
        this.isCreditNumber = res.data[5].isCreditNumber;
        this.organCertificateNumber = res.data[6].organCertificateNumber;
        this.constructionSite = res.data[7].constructionSite;
        this.establishmentDepartment = res.data[8].establishmentDepartment;
        this.industryType = res.data[9].industryType;
        this.enviAssessmentUnit = res.data[10].enviAssessmentUnit;
        this.enviAssessmentClass = res.data[11].enviAssessmentClass;
        this.enviAssessmentEngineer = res.data[12].enviAssessmentEngineer;
        this.projectAttribute = res.data[13].projectAttribute;
        this.constrctProjectClass = res.data[14].constrctProjectClass;
      }
    });
  }

}
