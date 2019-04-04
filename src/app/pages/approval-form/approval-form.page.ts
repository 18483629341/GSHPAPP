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
    this.projectFilesService.getApprovalForm({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.projectName = res.PROJECTNAME || '/';
        this.projectNumber = res.PROJECTNUMBER || '/';
        this.countIndustryType = res.COUNTINDUSTRYTYPE || '/';
        this.eviIndustryType = res.EVIINDUSTRYTYPE || '/';
        this.constructionSiteLon = res.CONSTRUCTIONSITELON || '/';
        this.constructionSiteLat = res.CONSTRUCTIONSITELAT || '/';
        this.constructionNature = res.CONSTRUCTIONNATURE || '/';
        this.eviFileType = res.EVIFILETYPE || '/';
        this.totalInvest = res.TOTALINVEST || '/';
        this.enviInvest = res.ENVIINVEST || '/';
        this.proportion = res.PROPORTION || '/';
        this.planStartTime = res.PLANSTARTTIME || '/';
        this.estimatedTime = res.ESTIMATEDTIME || '/';
        this.constructionSite = res.CONSTRUCTIONSITE || '/';
        this.constructionCycle = res.CONSTRUCTIONCYCLE || '/';
        this.licenseNumber = res.LICENSENUMBER || '/';
        this.peojectApplyType = res.PEOJECTAPPLYTYPE || '/';
        this.isDevople = res.ISDEVOPLE || '/';
        this.planDocumentName = res.PLANDOCUMENTNAME || '/';
        this.planExamAuthority = res.PLANEXAMAUTHORITY || '/';
        this.planExamNumber = res.PLANEXAMNUMBER || '/';
        this.constructContent = res.CONSTRUCTCONTENT || '/';
        this.constructScale = res.CONSTRUCTSCALE || '/';
        this.startLon = res.STARTLON || '/';
        this.startLat = res.STARTLAT || '/';
        this.endLon = res.ENDLON || '/';
        this.endLat = res.ENDLAT || '/';
        this.engineerLength = res.ENGINEERLENGTH || '/';
        this.constructionUnit = res.CONSTRUCTIONUNIT || '/';
        this.address = res.ADDRESS || '/';
        this.legalPerson = res.LEGALPERSON || '/';
        this.technology = res.TECHNOLOGY || '/';
        this.socialCreditCode = res.SOCIALCREDITCODE || '/';
        this.constructionUnitPhone = res.CONSTRUCTIONUNITPHONE || '/';
        this.evaluatUnitName = res.EVALUATUNITNAME || '/';
        this.evaluatUnitAddress = res.EVALUATUNITADDRESS || '/';
        this.evaluatUnitPhone = res.EVALUATUNITPHONE || '/';
        this.evaluatUnitNumber = res.EVALUATUNITNUMBER || '/';
      }
    });
  }

}
