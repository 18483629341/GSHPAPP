import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
@Component({
  selector: 'app-inspection-record',
  templateUrl: './inspection-record.page.html',
  styleUrls: ['./inspection-record.page.scss'],
})
export class InspectionRecordPage implements OnInit {
  checkTime: any;
  checkPeople: any;
  remark: any;
  fileName: any;
  fileId: any;
  checkId: any;
  toDetail() {
    this.router.navigate(['inspection-detail']);
  }
  constructor(private router: Router, public projectFilesService: ProjectFilesService,  ) { 
    this.getInspectionRecord();
  }

  ngOnInit() {
  }
  getInspectionRecord(): void {
    this.projectFilesService.getInspectionRecord({
      projectCode: 1,
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        // this.baseInfoList = res.data || [];
        this.checkTime = res.checkTime;
        this.checkPeople = res.checkPeople;
        this.remark = res.remark;
        this.fileName = res.fileName;
        this.fileId = res.fileId;
        this.checkId = res.checkId;
      }
    });
  }

}
