import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-record-info',
  templateUrl: './record-info.page.html',
  styleUrls: ['./record-info.page.scss'],
})
export class RecordInfoPage implements OnInit {
  dataList: any;
  projectCode: any; // 项目Id
  noData: any = '/'; // 无数据显示/

  constructor(public projectFilesService: ProjectFilesService, public activatedRoute: ActivatedRoute ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.projectCode = params.projectCode;
    });
   }

  ngOnInit() {
    this.getRecordInfo();
  }
  getRecordInfo(): void {
    this.projectFilesService.getRecordInfo({
      projectCode: this.projectCode,
    }, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.dataList = res || [];
      }
    });
  }
}
