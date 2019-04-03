import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
@Component({
  selector: 'app-handling',
  templateUrl: './handling.page.html',
  styleUrls: ['./handling.page.scss'],
})
export class HandlingPage implements OnInit {


  listAarry: any = [];
  delayedList: any = [];

  constructor(public projectFilesService: ProjectFilesService, ) {
    this.getHandling();
    this.getDelayRecord();
  }

  ngOnInit() {
  }
  getHandling() {
    this.projectFilesService.getHandling({}, true, res => {
      console.log(res);
      if (res !== 'error') {
         this.listAarry = res || [];
      }
    });
  }
  getDelayRecord() {
    this.projectFilesService.getDelayRecord({}, false, res => {
      console.log(res);
      if (res !== 'error') {
         this.delayedList = res || [];
      }
    });
  }
}
