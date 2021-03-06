import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-handling',
  templateUrl: './handling.page.html',
  styleUrls: ['./handling.page.scss'],
})
export class HandlingPage implements OnInit {


  listAarry: any = [];
  delayedList: any = [];
  projectCode: any; // 项目id
  noData: any = '/'; // 没数据处理

  constructor(public projectFilesService: ProjectFilesService, public activatedRoute: ActivatedRoute,  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.projectCode = params.projectCode;
    });
  }

  ngOnInit() {
    this.getHandling();
    this.getDelayRecord();
  }
  getHandling() {
    this.projectFilesService.getHandling({projectCode: this.projectCode}, true, res => {
      console.log(res);
      if (res !== 'error') {
         this.listAarry = res || [];
      }
    });
  }
  getDelayRecord() {
    this.projectFilesService.getDelayRecord({projectCode: this.projectCode}, false, res => {
      console.log(res);
      if (res !== 'error') {
         this.delayedList = res || [];
      }
    });
  }
}
