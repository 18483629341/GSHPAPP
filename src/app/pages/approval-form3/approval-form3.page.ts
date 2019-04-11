import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service';
@Component({
  selector: 'app-approval-form3',
  templateUrl: './approval-form3.page.html',
  styleUrls: ['./approval-form3.page.scss'],
})
export class ApprovalForm3Page implements OnInit {
  public nature: any = {
    constructionNature: '\\',
    engineerImpact: '\\',
    isOccupy: '\\',
    level: '\\',
    majorProtectedObj: '\\',
    name: '\\',
    occupyArea: '\\'
  };
  public nature1: any = {
    constructionNature: '\\',
    engineerImpact: '\\',
    isOccupy: '\\',
    level: '\\',
    majorProtectedObj: '\\',
    name: '\\',
    occupyArea: '\\'
  };
  public nature2: any = {
    constructionNature: '\\',
    engineerImpact: '\\',
    isOccupy: '\\',
    level: '\\',
    majorProtectedObj: '\\',
    name: '\\',
    occupyArea: '\\'
  };
  public nature3: any = {
    constructionNature: '\\',
    engineerImpact: '\\',
    isOccupy: '\\',
    level: '\\',
    majorProtectedObj: '\\',
    name: '\\',
    occupyArea: '\\'
  };
  constructor(public projectFilesService: ProjectFilesService, ) {
    this.getApprovalForm3(0, false);
    this.getApprovalForm3(1, false);
    this.getApprovalForm3(2, false);
    this.getApprovalForm3(3, true);
  }

  ngOnInit() {
  }
  getApprovalForm3(dataType, falg) {
    this.projectFilesService.getApprovalForm3({ projectCode: 1, dataType: dataType }, falg, res => {
      console.log(res);
      if (dataType === 0) {
        if (res !== 'error' && !this.isEmptyObject(res)) {
          console.log('aaaaaaaaaa');
          this.nature = res;
          console.log(this.nature);
        }
      } else if (dataType === 1) {
        console.log(1);
        if (res !== 'error' && !this.isEmptyObject(res)) {
          this.nature1 = res;
        }
      } else if (dataType === 2) {
        console.log(2);
        if (res !== 'error' && !this.isEmptyObject(res)) {
          this.nature2 = res;
        }
      } else if (dataType === 3) {
        console.log(3);
        if (res !== 'error' && !this.isEmptyObject(res)) {
          this.nature3 = res;
        }
      }
    });
  }

  isEmptyObject(object) {
    console.log('对象长度为' + Object.keys(object).length);
    if (Object.keys(object).length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
