import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; 
@Component({
  selector: 'app-approval-form3',
  templateUrl: './approval-form3.page.html',
  styleUrls: ['./approval-form3.page.scss'],
})
export class ApprovalForm3Page implements OnInit {
  nature: any = {
    name: '',
    level: '',
    engineerImpact: '',
    isOccupy: '',
    occupyArea: '',
    constructionNature: '',
    majorProtectedObj: '',
  };
  constructor(public projectFilesService: ProjectFilesService, ) {
    this.getApprovalForm3();
   }

  ngOnInit() {
  }
  getApprovalForm3() {
    this.projectFilesService.getApprovalForm3({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.nature.name = res.nature.name;
        this.nature.level = res.nature.level;
        this.nature.engineerImpact = res.nature.engineerImpact;
        this.nature.isOccupy = res.nature.isOccupy;
        this.nature.occupyArea = res.nature.occupyArea;
        this.nature.constructionNature = res.nature.constructionNature;
        this.nature.majorProtectedObj = res.nature.majorProtectedObj;
      }
    });
  }

}
