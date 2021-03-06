import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.page.html',
  styleUrls: ['./approval-form.page.scss'],
})
export class ApprovalFormPage implements OnInit {
  projectName: any;
  projectNumber: any;
  countIndustryType: any;
  eviIndustryType: any;
  constructionSiteLon: any;
  constructionSiteLat: any;
  constructionNature: any;
  eviFileType: any;
  totalInvest: any;
  enviInvest: any;
  proportion: any;
  planStartTime: any;
  estimatedTime: any;
  constructionSite: any;
  constructionCycle: any;
  licenseNumber: any;
  peojectApplyType: any;
  isDevople: any;
  planDocumentName: any;
  planExamAuthority: any;
  planExamNumber: any;
  constructContent: any;
  constructScale: any;
  startLon: any;
  startLat: any;
  endLon: any;
  endLat: any;
  engineerLength: any;
  constructionUnit: any;
  address: any;
  legalPerson: any;
  technology: any;
  socialCreditCode: any;
  constructionUnitPhone: any;
  evaluatUnitName: any;
  evaluatUnitAddress: any;
  evaluatUnitPhone: any;
  evaluatUnitNumber: any;
  constructor(public projectFilesService: ProjectFilesService, ) {
    this.getApprovalForm();
  }

  ngOnInit() {
  }
  getApprovalForm() {
    this.projectFilesService.getApprovalForm({projectCode: 1}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.projectName = res.projectName || '/';
        this.projectNumber = res.projectNumber || '/';
        this.countIndustryType = res.countIndustryType || '/';
        this.eviIndustryType = res.eviIndustryType || '/';
        this.constructionSiteLon = res.constructionSiteLon || '/';
        this.constructionSiteLat = res.constructionSiteLat || '/';
        this.constructionNature = res.constructionNature || '/';
        this.eviFileType = res.eviFileType || '/';
        this.totalInvest = res.totalInvest || '/';
        this.enviInvest = res.enviInvest || '/';
        this.proportion = res.proportion || '/';
        this.planStartTime = res.planStartTime || '/';
        this.estimatedTime = res.estimatedTime || '/';
        this.constructionSite = res.constructionSite || '/';
        this.constructionCycle = res.constructionCycle || '/';
        this.licenseNumber = res.licenseNumber || '/';
        this.peojectApplyType = res.peojectApplyType || '/';
        this.isDevople = res.isDevople || '/';
        this.planDocumentName = res.planDocumentName || '/';
        this.planExamAuthority = res.planExamAuthority || '/';
        this.planExamNumber = res.planExamNumber || '/';
        this.constructContent = res.constructContent || '/';
        this.constructScale = res.constructScale || '/';
        this.startLon = res.startLon || '/';
        this.startLat = res.startLat || '/';
        this.endLon = res.endLon || '/';
        this.endLat = res.endLat || '/';
        this.engineerLength = res.engineerLength || '/';
        this.constructionUnit = res.constructionUnit || '/';
        this.address = res.address || '/';
        this.legalPerson = res.legalPerson || '/';
        this.technology = res.technology || '/';
        this.socialCreditCode = res.socialCreditCode || '/';
        this.constructionUnitPhone = res.constructionUnitPhone || '/';
        this.evaluatUnitName = res.evaluatUnitName || '/';
        this.evaluatUnitAddress = res.evaluatUnitAddress || '/';
        this.evaluatUnitPhone = res.evaluatUnitPhone || '/';
        this.evaluatUnitNumber = res.evaluatUnitNumber || '/';
      }
    });
  }

}
